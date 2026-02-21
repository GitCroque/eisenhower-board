import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { rateLimit } from 'express-rate-limit';
import {
  getAllTasks,
  createTask,
  updateTaskText,
  updateTaskQuadrant,
  deleteTask,
  completeTask,
  getArchivedTasks,
  deleteArchivedTask,
} from './db.js';
import { sanitizeText } from '../shared/sanitize.js';
import { CreateTaskRequestSchema, UpdateTaskRequestSchema } from '../shared/validation.js';

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3080;

// CSRF Token store with automatic cleanup
const csrfTokens = new Map<string, number>();
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour
const CSRF_MAX_USES = 50;
const csrfUseCounts = new Map<string, number>();

// Cleanup expired tokens every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, timestamp] of csrfTokens.entries()) {
    if (now - timestamp > CSRF_TOKEN_EXPIRY) {
      csrfTokens.delete(token);
      csrfUseCounts.delete(token);
    }
  }
}, 15 * 60 * 1000);

// Middleware
app.use(express.json({ limit: '10kb' }));

// Rate limiting for mutating endpoints
const mutationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

// Rate limiting for read endpoints
const readLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

// Rate limiting for CSRF token endpoint (prevents memory growth via token spam)
const csrfLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

// Serve static files from the dist directory
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

// CSRF Token endpoint
app.get('/api/csrf-token', csrfLimiter, (_req: Request, res: Response) => {
  // Cap total tokens to prevent unbounded memory growth
  if (csrfTokens.size >= 1000) {
    const entries = [...csrfTokens.entries()].sort((a, b) => a[1] - b[1]);
    for (const [oldToken] of entries.slice(0, 100)) {
      csrfTokens.delete(oldToken);
      csrfUseCounts.delete(oldToken);
    }
  }

  const token = crypto.randomUUID();
  csrfTokens.set(token, Date.now());
  csrfUseCounts.set(token, 0);
  res.json({ token });
});

// CSRF validation middleware
function validateCsrf(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['x-csrf-token'] as string;

  if (!token || !csrfTokens.has(token)) {
    res.status(403).json({ error: 'Invalid or missing CSRF token' });
    return;
  }

  const uses = (csrfUseCounts.get(token) || 0) + 1;
  if (uses > CSRF_MAX_USES) {
    csrfTokens.delete(token);
    csrfUseCounts.delete(token);
    res.status(403).json({ error: 'CSRF token expired, please refresh' });
    return;
  }

  csrfUseCounts.set(token, uses);
  csrfTokens.set(token, Date.now());
  next();
}

// API Routes

app.get('/api/tasks', readLimiter, (_req: Request, res: Response) => {
  try {
    const tasks = getAllTasks();
    res.json(tasks);
  } catch (err) {
    console.error('GET /api/tasks error:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', mutationLimiter, validateCsrf, (req: Request, res: Response) => {
  try {
    const parsed = CreateTaskRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }

    const sanitizedText = sanitizeText(parsed.data.text);
    if (sanitizedText.length === 0) {
      res.status(400).json({ error: 'Invalid task text' });
      return;
    }

    const id = crypto.randomUUID();
    const createdAt = Date.now();
    const task = createTask(id, sanitizedText, parsed.data.quadrant, createdAt);

    res.status(201).json(task);
  } catch (err) {
    console.error('POST /api/tasks error:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.patch('/api/tasks/:id', mutationLimiter, validateCsrf, (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const parsed = UpdateTaskRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }

    const { text, quadrant } = parsed.data;

    if (text !== undefined) {
      const sanitizedText = sanitizeText(text);
      if (sanitizedText.length === 0) {
        res.status(400).json({ error: 'Invalid task text' });
        return;
      }

      const updated = updateTaskText(id, sanitizedText);
      if (!updated) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
    }

    if (quadrant !== undefined) {
      const updated = updateTaskQuadrant(id, quadrant);
      if (!updated) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('PATCH /api/tasks error:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', mutationLimiter, validateCsrf, (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = deleteTask(id);

    if (!deleted) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/tasks error:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.post('/api/tasks/:id/complete', mutationLimiter, validateCsrf, (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const completed = completeTask(id);

    if (!completed) {
      res.status(404).json({ error: 'Task not found or already completed' });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/tasks/:id/complete error:', err);
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

app.get('/api/archived-tasks', readLimiter, (_req: Request, res: Response) => {
  try {
    const tasks = getArchivedTasks();
    res.json(tasks);
  } catch (err) {
    console.error('GET /api/archived-tasks error:', err);
    res.status(500).json({ error: 'Failed to fetch archived tasks' });
  }
});

app.delete('/api/archived-tasks/:id', mutationLimiter, validateCsrf, (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = deleteArchivedTask(id);

    if (!deleted) {
      res.status(404).json({ error: 'Archived task not found' });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/archived-tasks error:', err);
    res.status(500).json({ error: 'Failed to delete archived task' });
  }
});

// Return 404 JSON for unknown API routes (prevent SPA fallback serving HTML)
app.use('/api', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// Fallback: serve index.html for SPA routing
app.get('/{*splat}', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

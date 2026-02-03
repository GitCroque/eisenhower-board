import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import {
  getAllTasks,
  createTask,
  updateTaskText,
  updateTaskQuadrant,
  deleteTask,
} from './db.js';
import { sanitizeText, isValidTaskText } from '../shared/sanitize.js';
import { QUADRANT_KEYS, QuadrantKey } from '../shared/types.js';

const app = express();
const PORT = process.env.PORT || 3080;

// CSRF Token store with automatic cleanup
const csrfTokens = new Map<string, number>();
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

// Cleanup expired tokens every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, timestamp] of csrfTokens.entries()) {
    if (now - timestamp > CSRF_TOKEN_EXPIRY) {
      csrfTokens.delete(token);
    }
  }
}, 15 * 60 * 1000);

// Middleware
app.use(express.json({ limit: '10kb' }));

// Serve static files from the dist directory
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

// CSRF Token endpoint
app.get('/api/csrf-token', (_req: Request, res: Response) => {
  const token = crypto.randomUUID();
  csrfTokens.set(token, Date.now());
  res.json({ token });
});

// CSRF validation middleware for mutating requests
function validateCsrf(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['x-csrf-token'] as string;

  if (!token || !csrfTokens.has(token)) {
    res.status(403).json({ error: 'Invalid or missing CSRF token' });
    return;
  }

  // Token is valid, refresh its timestamp
  csrfTokens.set(token, Date.now());
  next();
}

// API Routes

// GET /api/tasks - Get all tasks grouped by quadrant
app.get('/api/tasks', (_req: Request, res: Response) => {
  try {
    const tasks = getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /api/tasks - Create a new task
app.post('/api/tasks', validateCsrf, (req: Request, res: Response) => {
  try {
    const { text, quadrant } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const sanitizedText = sanitizeText(text);
    if (!isValidTaskText(sanitizedText)) {
      res.status(400).json({ error: 'Invalid task text' });
      return;
    }

    if (!quadrant || !isValidQuadrant(quadrant)) {
      res.status(400).json({ error: 'Valid quadrant is required' });
      return;
    }

    const id = crypto.randomUUID();
    const createdAt = Date.now();
    const task = createTask(id, sanitizedText, quadrant, createdAt);

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PATCH /api/tasks/:id - Update a task (text or quadrant)
app.patch('/api/tasks/:id', validateCsrf, (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { text, quadrant } = req.body;

    if (text !== undefined) {
      if (typeof text !== 'string') {
        res.status(400).json({ error: 'Text must be a string' });
        return;
      }

      const sanitizedText = sanitizeText(text);
      if (!isValidTaskText(sanitizedText)) {
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
      if (!isValidQuadrant(quadrant)) {
        res.status(400).json({ error: 'Invalid quadrant' });
        return;
      }
      const updated = updateTaskQuadrant(id, quadrant);
      if (!updated) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - Delete a task
app.delete('/api/tasks/:id', validateCsrf, (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = deleteTask(id);

    if (!deleted) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Fallback: serve index.html for SPA routing
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Helper function to validate quadrant
function isValidQuadrant(quadrant: string): quadrant is QuadrantKey {
  return QUADRANT_KEYS.includes(quadrant as QuadrantKey);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

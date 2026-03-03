import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'crypto';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import db, {
  getAllTasks,
  createTask,
  updateTaskText,
  updateTaskQuadrant,
  deleteTask,
  completeTask,
  getArchivedTasksPaginated,
  deleteArchivedTask,
  findOrCreateUserByEmail,
  createMagicLink,
  consumeMagicLink,
  createSession,
  getSessionByHash,
  touchSession,
  deleteSessionByHash,
  deleteSessionById,
  cleanupExpiredAuth,
  normalizeEmail,
} from './db.js';
import { sendMagicLinkEmail, isMailerConfigured } from './mailer.js';
import { sanitizeText } from '../shared/sanitize.js';
import {
  CreateTaskRequestSchema,
  UpdateTaskRequestSchema,
  TaskIdSchema,
  MagicLinkRequestSchema,
} from '../shared/validation.js';

const app = express();
const PORT = process.env.PORT || 3080;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const MAGIC_LINK_TTL_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_COOKIE_NAME = 'eisenhower_session';
const CSRF_COOKIE_NAME = 'eisenhower_csrf';
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.set('trust proxy', 1);
}

interface AuthContext {
  sessionId: string;
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((acc, part) => {
    const [key, ...valueParts] = part.trim().split('=');
    if (!key || valueParts.length === 0) {
      return acc;
    }
    const rawValue = valueParts.join('=');
    try {
      acc[key] = decodeURIComponent(rawValue);
    } catch {
      acc[key] = rawValue;
    }
    return acc;
  }, {});
}

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function safeTokenEquals(left: string, right: string): boolean {
  const leftBuf = Buffer.from(left);
  const rightBuf = Buffer.from(right);
  if (leftBuf.length !== rightBuf.length) {
    return false;
  }
  return timingSafeEqual(leftBuf, rightBuf);
}

function clearAuthCookies(res: Response): void {
  res.clearCookie(SESSION_COOKIE_NAME, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
  });
  res.clearCookie(CSRF_COOKIE_NAME, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: isProduction,
  });
}

function getAppBaseUrl(): string {
  const configuredBaseUrl = process.env.APP_BASE_URL?.trim();
  if (!configuredBaseUrl) {
    throw new Error('APP_BASE_URL environment variable is required');
  }
  return configuredBaseUrl.replace(/\/+$/, '');
}

function authenticateSession(req: Request, res: Response, next: NextFunction): void {
  const cookies = parseCookies(req.headers.cookie);
  const rawSessionToken = cookies[SESSION_COOKIE_NAME];
  if (!rawSessionToken) {
    next();
    return;
  }

  const sessionHash = hashToken(rawSessionToken);
  const now = Date.now();
  const session = getSessionByHash(sessionHash, now);
  if (!session) {
    deleteSessionByHash(sessionHash);
    clearAuthCookies(res);
    next();
    return;
  }

  const refreshedExpiry = now + SESSION_TTL_MS;
  touchSession(session.sessionId, now, refreshedExpiry);
  req.auth = {
    sessionId: session.sessionId,
    userId: session.userId,
    email: session.email,
  };
  next();
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.auth) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}

function validateCsrf(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers['x-csrf-token'];
  const csrfHeader = Array.isArray(header) ? header[0] : header;
  const cookies = parseCookies(req.headers.cookie);
  const csrfCookie = cookies[CSRF_COOKIE_NAME];

  if (!csrfHeader || !csrfCookie || !safeTokenEquals(csrfHeader, csrfCookie)) {
    res.status(403).json({ error: 'Invalid or missing CSRF token' });
    return;
  }

  next();
}

app.use(compression());

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
    },
  },
}));

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use('/api', authenticateSession);

// Cleanup expired auth artifacts every 15 minutes
setInterval(() => {
  cleanupExpiredAuth(Date.now());
}, 15 * 60 * 1000).unref();

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

const csrfLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

const magicLinkIpLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

const magicLinkEmailLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const ip = ipKeyGenerator(req.ip ?? '');
    const email = typeof req.body?.email === 'string' ? normalizeEmail(req.body.email) : '';
    return `${ip}:${email || 'unknown'}`;
  },
  message: { error: 'Too many requests, please try again later' },
});

const verifyLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

// Serve static files from the dist directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', '..', 'dist');
app.use('/assets', express.static(path.join(distPath, 'assets'), {
  maxAge: '1y',
  immutable: true,
}));
app.use(express.static(distPath));

app.get('/api/health', readLimiter, (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/magic-link', magicLinkIpLimiter, magicLinkEmailLimiter, async (req: Request, res: Response) => {
  try {
    const parsed = MagicLinkRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }

    if (!isMailerConfigured()) {
      res.status(500).json({ error: 'Email provider is not configured' });
      return;
    }

    const now = Date.now();
    const user = findOrCreateUserByEmail(parsed.data.email, now);
    const rawToken = randomBytes(32).toString('base64url');
    const tokenHash = hashToken(rawToken);
    const expiresAt = now + MAGIC_LINK_TTL_MS;

    createMagicLink({
      id: randomUUID(),
      userId: user.id,
      tokenHash,
      expiresAt,
      createdAt: now,
      createdIp: req.ip || null,
    });

    const verifyUrl = `${getAppBaseUrl()}/api/auth/verify?token=${encodeURIComponent(rawToken)}`;
    await sendMagicLinkEmail({
      to: user.email,
      link: verifyUrl,
      expiresInMinutes: Math.floor(MAGIC_LINK_TTL_MS / 60000),
    });

    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/auth/magic-link error:', err);
    res.status(500).json({ error: 'Failed to send magic link' });
  }
});

app.get('/api/auth/verify', verifyLimiter, (req: Request, res: Response) => {
  try {
    const token = typeof req.query.token === 'string' ? req.query.token : '';
    if (!token) {
      res.redirect('/?auth=invalid');
      return;
    }

    const now = Date.now();
    const consumed = consumeMagicLink(hashToken(token), now);
    if (!consumed) {
      res.redirect('/?auth=invalid');
      return;
    }

    const rawSessionToken = randomBytes(32).toString('base64url');
    const sessionHash = hashToken(rawSessionToken);
    const sessionExpiresAt = now + SESSION_TTL_MS;

    createSession({
      sessionId: randomUUID(),
      userId: consumed.userId,
      sessionHash,
      expiresAt: sessionExpiresAt,
      createdAt: now,
      ip: req.ip || null,
      userAgent: req.get('user-agent') || null,
    });

    res.cookie(SESSION_COOKIE_NAME, rawSessionToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL_MS,
    });

    const csrfToken = randomBytes(32).toString('base64url');
    res.cookie(CSRF_COOKIE_NAME, csrfToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL_MS,
    });

    res.redirect('/');
  } catch (err) {
    console.error('GET /api/auth/verify error:', err);
    res.redirect('/?auth=invalid');
  }
});

app.get('/api/auth/me', readLimiter, (req: Request, res: Response) => {
  if (!req.auth) {
    res.json({ authenticated: false });
    return;
  }

  res.json({
    authenticated: true,
    user: {
      email: req.auth.email,
    },
  });
});

app.post('/api/auth/logout', mutationLimiter, validateCsrf, (req: Request, res: Response) => {
  try {
    if (req.auth) {
      deleteSessionById(req.auth.sessionId);
    }
    clearAuthCookies(res);
    res.json({ success: true });
  } catch (err) {
    console.error('POST /api/auth/logout error:', err);
    res.status(500).json({ error: 'Failed to log out' });
  }
});

// CSRF Token endpoint for authenticated users
app.get('/api/csrf-token', csrfLimiter, requireAuth, (_req: Request, res: Response) => {
  const token = randomBytes(32).toString('base64url');
  res.cookie(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS,
  });
  res.json({ token });
});

// API Routes
app.get('/api/tasks', readLimiter, requireAuth, (req: Request, res: Response) => {
  try {
    const tasks = getAllTasks(req.auth!.userId);
    res.json(tasks);
  } catch (err) {
    console.error('GET /api/tasks error:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', mutationLimiter, requireAuth, validateCsrf, (req: Request, res: Response) => {
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

    const id = randomUUID();
    const createdAt = Date.now();
    const task = createTask(req.auth!.userId, id, sanitizedText, parsed.data.quadrant, createdAt);

    res.status(201).json(task);
  } catch (err) {
    console.error('POST /api/tasks error:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.patch('/api/tasks/:id', mutationLimiter, requireAuth, validateCsrf, (req: Request, res: Response) => {
  try {
    const idResult = TaskIdSchema.safeParse(req.params.id);
    if (!idResult.success) {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    const id = idResult.data;
    const parsed = UpdateTaskRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }

    const { text, quadrant } = parsed.data;

    const updateTask = db.transaction(() => {
      if (text !== undefined) {
        const sanitizedText = sanitizeText(text);
        if (sanitizedText.length === 0) {
          return { error: 'Invalid task text', status: 400 };
        }
        const updated = updateTaskText(req.auth!.userId, id, sanitizedText);
        if (!updated) {
          return { error: 'Task not found', status: 404 };
        }
      }

      if (quadrant !== undefined) {
        const updated = updateTaskQuadrant(req.auth!.userId, id, quadrant);
        if (!updated) {
          return { error: 'Task not found', status: 404 };
        }
      }

      return null;
    });

    const result = updateTask();
    if (result) {
      res.status(result.status).json({ error: result.error });
      return;
    }

    res.json({ success: true });
  } catch (err) {
    console.error('PATCH /api/tasks error:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', mutationLimiter, requireAuth, validateCsrf, (req: Request, res: Response) => {
  try {
    const idResult = TaskIdSchema.safeParse(req.params.id);
    if (!idResult.success) {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    const id = idResult.data;
    const deleted = deleteTask(req.auth!.userId, id);

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

app.post('/api/tasks/:id/complete', mutationLimiter, requireAuth, validateCsrf, (req: Request, res: Response) => {
  try {
    const idResult = TaskIdSchema.safeParse(req.params.id);
    if (!idResult.success) {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    const id = idResult.data;
    const completed = completeTask(req.auth!.userId, id);

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

app.get('/api/archived-tasks', readLimiter, requireAuth, (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize as string) || 20));
    const result = getArchivedTasksPaginated(req.auth!.userId, page, pageSize);
    res.json(result);
  } catch (err) {
    console.error('GET /api/archived-tasks error:', err);
    res.status(500).json({ error: 'Failed to fetch archived tasks' });
  }
});

app.delete('/api/archived-tasks/:id', mutationLimiter, requireAuth, validateCsrf, (req: Request, res: Response) => {
  try {
    const idResult = TaskIdSchema.safeParse(req.params.id);
    if (!idResult.success) {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    const id = idResult.data;
    const deleted = deleteArchivedTask(req.auth!.userId, id);

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

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function gracefulShutdown(signal: string) {
  console.log(`${signal} received, shutting down...`);
  server.close(() => {
    db.close();
    process.exit(0);
  });
  setTimeout(() => {
    db.close();
    process.exit(1);
  }, 5000).unref();
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

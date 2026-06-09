import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import type { QuadrantsState } from '@/types';

const mockTasks: QuadrantsState = {
  urgentImportant: [
    { id: '1', text: 'Urgent task', createdAt: Date.now() },
  ],
  notUrgentImportant: [],
  urgentNotImportant: [],
  notUrgentNotImportant: [],
};

const csrfToken = 'test-csrf-token';

function validateCsrf(request: globalThis.Request): boolean {
  return request.headers.get('X-CSRF-Token') === csrfToken;
}

function csrfError(): Response {
  return HttpResponse.json(
    { error: 'Invalid or missing CSRF token', code: 'CSRF' },
    { status: 403 },
  );
}

export const handlers = [
  // Health check
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok' });
  }),

  // Auth bootstrap
  http.get('/api/auth/me', () => {
    return HttpResponse.json({
      authenticated: true,
      user: { email: 'test@example.com', isAdmin: false },
    });
  }),

  // Magic link request (always replies with a generic success)
  http.post('/api/auth/magic-link', () => {
    return HttpResponse.json({ success: true });
  }),

  // Magic link verification (interstitial HTML page)
  http.get('/api/auth/verify', () => {
    return new HttpResponse('<!doctype html><html><body>Sign in</body></html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }),

  // Magic link consumption (redirects to the app)
  http.post('/api/auth/verify/consume', () => {
    return new HttpResponse(null, {
      status: 302,
      headers: { Location: '/' },
    });
  }),

  // Logout
  http.post('/api/auth/logout', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  // Sessions
  http.get('/api/auth/sessions', () => {
    return HttpResponse.json({
      sessions: [
        {
          id: 'session-1',
          createdAt: Date.now() - 86400000,
          lastSeenAt: Date.now(),
          ip: '127.0.0.1',
          userAgent: 'Test agent',
          current: true,
        },
      ],
    });
  }),

  http.delete('/api/auth/sessions/:id', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  http.post('/api/auth/sessions/revoke-others', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true, revokedCount: 0 });
  }),

  // CSRF Token
  http.get('/api/csrf-token', () => {
    return HttpResponse.json({ token: csrfToken });
  }),

  // Get all tasks
  http.get('/api/tasks', () => {
    return HttpResponse.json(mockTasks);
  }),

  // Create task
  http.post('/api/tasks', async ({ request }) => {
    if (!validateCsrf(request)) return csrfError();

    const body = await request.json() as { text: string; quadrant: string };
    const newTask = {
      id: `task-${Date.now()}`,
      text: body.text,
      createdAt: Date.now(),
    };
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // Update task
  http.patch('/api/tasks/:id', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  // Delete task
  http.delete('/api/tasks/:id', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  // Complete task
  http.post('/api/tasks/:id/complete', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  // Batch operations (used for drag and drop moves)
  http.post('/api/tasks/batch', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  http.get('/api/archived-tasks', () => {
    return HttpResponse.json({
      tasks: [
        {
          id: 'archived-1',
          text: 'Archived task',
          createdAt: Date.now() - 86400000,
          completedAt: Date.now(),
          quadrant: 'urgentImportant',
        },
      ],
      total: 1,
      page: 1,
      pageSize: 20,
    });
  }),

  // Delete archived task
  http.delete('/api/archived-tasks/:id', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  // Restore archived task
  http.post('/api/archived-tasks/:id/restore', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  // Admin
  http.get('/api/admin/users', () => {
    return HttpResponse.json({
      users: [
        {
          id: 'user-1',
          email: 'alice@test.com',
          createdAt: Date.now() - 86400000,
          lastLoginAt: Date.now(),
          taskCount: 3,
        },
      ],
      total: 1,
      page: 1,
      pageSize: 50,
    });
  }),

  http.get('/api/admin/stats', () => {
    return HttpResponse.json({ totalUsers: 1, activeUsers30d: 1 });
  }),

  http.delete('/api/admin/users/:id', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  // Account
  http.delete('/api/account', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),

  http.post('/api/account/change-email', ({ request }) => {
    if (!validateCsrf(request)) return csrfError();
    return HttpResponse.json({ success: true });
  }),
];

export const server = setupServer(...handlers);

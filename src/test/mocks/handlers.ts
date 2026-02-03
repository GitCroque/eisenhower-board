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

let csrfToken = 'test-csrf-token';

export const handlers = [
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
    const token = request.headers.get('X-CSRF-Token');
    if (token !== csrfToken) {
      return HttpResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    const body = await request.json() as { text: string; quadrant: string };
    const newTask = {
      id: `task-${Date.now()}`,
      text: body.text,
      createdAt: Date.now(),
    };
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // Update task
  http.patch('/api/tasks/:id', async ({ request }) => {
    const token = request.headers.get('X-CSRF-Token');
    if (token !== csrfToken) {
      return HttpResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    return HttpResponse.json({ success: true });
  }),

  // Delete task
  http.delete('/api/tasks/:id', async ({ request }) => {
    const token = request.headers.get('X-CSRF-Token');
    if (token !== csrfToken) {
      return HttpResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    return HttpResponse.json({ success: true });
  }),
];

export const server = setupServer(...handlers);

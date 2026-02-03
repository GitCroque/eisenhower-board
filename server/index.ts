import express from 'express';
import path from 'path';
import {
  getAllTasks,
  createTask,
  updateTaskText,
  updateTaskQuadrant,
  deleteTask,
  QuadrantKey,
} from './db.js';

const app = express();
const PORT = process.env.PORT || 3080;

// Middleware
app.use(express.json());

// Serve static files from the dist directory
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

// API Routes

// GET /api/tasks - Get all tasks grouped by quadrant
app.get('/api/tasks', (_req, res) => {
  try {
    const tasks = getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST /api/tasks - Create a new task
app.post('/api/tasks', (req, res) => {
  try {
    const { text, quadrant } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!quadrant || !isValidQuadrant(quadrant)) {
      return res.status(400).json({ error: 'Valid quadrant is required' });
    }

    const id = crypto.randomUUID();
    const createdAt = Date.now();
    const task = createTask(id, text.trim(), quadrant, createdAt);

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PATCH /api/tasks/:id - Update a task (text or quadrant)
app.patch('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { text, quadrant } = req.body;

    if (text !== undefined) {
      if (typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ error: 'Text must be a non-empty string' });
      }
      const updated = updateTaskText(id, text.trim());
      if (!updated) {
        return res.status(404).json({ error: 'Task not found' });
      }
    }

    if (quadrant !== undefined) {
      if (!isValidQuadrant(quadrant)) {
        return res.status(400).json({ error: 'Invalid quadrant' });
      }
      const updated = updateTaskQuadrant(id, quadrant);
      if (!updated) {
        return res.status(404).json({ error: 'Task not found' });
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id - Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = deleteTask(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Fallback: serve index.html for SPA routing
app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Helper function to validate quadrant
function isValidQuadrant(quadrant: string): quadrant is QuadrantKey {
  return [
    'urgentImportant',
    'notUrgentImportant',
    'urgentNotImportant',
    'notUrgentNotImportant',
  ].includes(quadrant);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

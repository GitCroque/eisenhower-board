import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DATA_DIR = process.env.DATA_DIR || '/app/data';
const DB_PATH = path.join(DATA_DIR, 'tasks.db');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    quadrant TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )
`);

export interface DbTask {
  id: string;
  text: string;
  quadrant: string;
  created_at: number;
}

export type QuadrantKey =
  | 'urgentImportant'
  | 'notUrgentImportant'
  | 'urgentNotImportant'
  | 'notUrgentNotImportant';

export interface Task {
  id: string;
  text: string;
  createdAt: number;
}

export type QuadrantsState = Record<QuadrantKey, Task[]>;

// Get all tasks grouped by quadrant
export function getAllTasks(): QuadrantsState {
  const rows = db.prepare('SELECT * FROM tasks ORDER BY created_at ASC').all() as DbTask[];

  const result: QuadrantsState = {
    urgentImportant: [],
    notUrgentImportant: [],
    urgentNotImportant: [],
    notUrgentNotImportant: [],
  };

  for (const row of rows) {
    const quadrant = row.quadrant as QuadrantKey;
    if (result[quadrant]) {
      result[quadrant].push({
        id: row.id,
        text: row.text,
        createdAt: row.created_at,
      });
    }
  }

  return result;
}

// Create a new task
export function createTask(id: string, text: string, quadrant: QuadrantKey, createdAt: number): Task {
  db.prepare('INSERT INTO tasks (id, text, quadrant, created_at) VALUES (?, ?, ?, ?)')
    .run(id, text, quadrant, createdAt);

  return { id, text, createdAt };
}

// Update task text
export function updateTaskText(id: string, text: string): boolean {
  const result = db.prepare('UPDATE tasks SET text = ? WHERE id = ?').run(text, id);
  return result.changes > 0;
}

// Update task quadrant (move task)
export function updateTaskQuadrant(id: string, quadrant: QuadrantKey): boolean {
  const result = db.prepare('UPDATE tasks SET quadrant = ? WHERE id = ?').run(quadrant, id);
  return result.changes > 0;
}

// Delete a task
export function deleteTask(id: string): boolean {
  const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  return result.changes > 0;
}

// Get a single task
export function getTask(id: string): DbTask | undefined {
  return db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as DbTask | undefined;
}

export default db;

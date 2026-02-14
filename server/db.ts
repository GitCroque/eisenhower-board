import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import type { Task, QuadrantKey, QuadrantsState, ArchivedTask } from '../shared/types.js';

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

// Migration: add completed_at column if it doesn't exist
const columns = db.prepare("PRAGMA table_info(tasks)").all() as { name: string }[];
const hasCompletedAt = columns.some(col => col.name === 'completed_at');
if (!hasCompletedAt) {
  db.exec('ALTER TABLE tasks ADD COLUMN completed_at INTEGER');
}

// Pre-compile prepared statements for better performance
const stmts = {
  getAllActive: db.prepare('SELECT * FROM tasks WHERE completed_at IS NULL ORDER BY created_at ASC'),
  getArchived: db.prepare('SELECT * FROM tasks WHERE completed_at IS NOT NULL ORDER BY completed_at DESC'),
  getById: db.prepare('SELECT * FROM tasks WHERE id = ?'),
  insert: db.prepare('INSERT INTO tasks (id, text, quadrant, created_at) VALUES (?, ?, ?, ?)'),
  updateText: db.prepare('UPDATE tasks SET text = ? WHERE id = ?'),
  updateQuadrant: db.prepare('UPDATE tasks SET quadrant = ? WHERE id = ?'),
  complete: db.prepare('UPDATE tasks SET completed_at = ? WHERE id = ? AND completed_at IS NULL'),
  deleteById: db.prepare('DELETE FROM tasks WHERE id = ?'),
  deleteArchived: db.prepare('DELETE FROM tasks WHERE id = ? AND completed_at IS NOT NULL'),
} as const;

export interface DbTask {
  id: string;
  text: string;
  quadrant: string;
  created_at: number;
  completed_at: number | null;
}

// Re-export types for convenience
export type { Task, QuadrantKey, QuadrantsState, ArchivedTask };

// Get all active tasks (not completed) grouped by quadrant
export function getAllTasks(): QuadrantsState {
  const rows = stmts.getAllActive.all() as DbTask[];

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

// Get all archived (completed) tasks
export function getArchivedTasks(): ArchivedTask[] {
  const rows = stmts.getArchived.all() as DbTask[];

  return rows.map(row => ({
    id: row.id,
    text: row.text,
    createdAt: row.created_at,
    completedAt: row.completed_at!,
    quadrant: row.quadrant as QuadrantKey,
  }));
}

// Complete a task (archive it)
export function completeTask(id: string): boolean {
  const result = stmts.complete.run(Date.now(), id);
  return result.changes > 0;
}

// Delete an archived task permanently
export function deleteArchivedTask(id: string): boolean {
  const result = stmts.deleteArchived.run(id);
  return result.changes > 0;
}

// Create a new task
export function createTask(id: string, text: string, quadrant: QuadrantKey, createdAt: number): Task {
  stmts.insert.run(id, text, quadrant, createdAt);
  return { id, text, createdAt };
}

// Update task text
export function updateTaskText(id: string, text: string): boolean {
  const result = stmts.updateText.run(text, id);
  return result.changes > 0;
}

// Update task quadrant (move task)
export function updateTaskQuadrant(id: string, quadrant: QuadrantKey): boolean {
  const result = stmts.updateQuadrant.run(quadrant, id);
  return result.changes > 0;
}

// Delete a task
export function deleteTask(id: string): boolean {
  const result = stmts.deleteById.run(id);
  return result.changes > 0;
}

// Get a single task
export function getTask(id: string): DbTask | undefined {
  return stmts.getById.get(id) as DbTask | undefined;
}

export default db;

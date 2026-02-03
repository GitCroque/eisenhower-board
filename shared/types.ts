export interface Task {
  id: string;
  text: string;
  createdAt: number;
}

export type QuadrantKey =
  | 'urgentImportant'
  | 'notUrgentImportant'
  | 'urgentNotImportant'
  | 'notUrgentNotImportant';

export type QuadrantsState = Record<QuadrantKey, Task[]>;

export interface CreateTaskRequest {
  text: string;
  quadrant: QuadrantKey;
}

export interface UpdateTaskRequest {
  text?: string;
  quadrant?: QuadrantKey;
}

export const QUADRANT_KEYS: QuadrantKey[] = [
  'urgentImportant',
  'notUrgentImportant',
  'urgentNotImportant',
  'notUrgentNotImportant',
];

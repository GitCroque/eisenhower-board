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

export interface QuadrantConfig {
  title: string;
  description: string;
  colorClass: string;
  iconColor: string;
}

export type QuadrantsState = Record<QuadrantKey, Task[]>;

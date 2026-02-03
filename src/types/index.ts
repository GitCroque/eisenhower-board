// Re-export shared types
export type {
  Task,
  QuadrantKey,
  QuadrantsState,
  CreateTaskRequest,
  UpdateTaskRequest,
} from '@shared/types';

export { QUADRANT_KEYS } from '@shared/types';

// Frontend-specific types
export interface QuadrantConfig {
  title: string;
  description: string;
  colorClass: string;
  iconColor: string;
}

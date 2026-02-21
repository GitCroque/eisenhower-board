import { z } from 'zod';

export const QuadrantKeySchema = z.enum([
  'urgentImportant',
  'notUrgentImportant',
  'urgentNotImportant',
  'notUrgentNotImportant',
]);

export const TaskSchema = z.object({
  id: z.string(),
  text: z.string(),
  createdAt: z.number(),
});

export const QuadrantsStateSchema = z.object({
  urgentImportant: z.array(TaskSchema),
  notUrgentImportant: z.array(TaskSchema),
  urgentNotImportant: z.array(TaskSchema),
  notUrgentNotImportant: z.array(TaskSchema),
});

export const CreateTaskRequestSchema = z.object({
  text: z.string().min(1, 'Text is required').max(500, 'Text too long'),
  quadrant: QuadrantKeySchema,
});

export const UpdateTaskRequestSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty').max(500, 'Text too long').optional(),
  quadrant: QuadrantKeySchema.optional(),
}).refine(
  (data) => data.text !== undefined || data.quadrant !== undefined,
  { message: 'At least one field must be provided' }
);

export type QuadrantKey = z.infer<typeof QuadrantKeySchema>;
export type Task = z.infer<typeof TaskSchema>;
export type QuadrantsState = z.infer<typeof QuadrantsStateSchema>;
export const TaskIdSchema = z.string().uuid('Invalid task ID');

export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;
export type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;

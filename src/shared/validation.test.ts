import { describe, it, expect } from 'vitest';
import {
  CreateTaskRequestSchema,
  UpdateTaskRequestSchema,
  QuadrantKeySchema,
} from '../../shared/validation';

describe('QuadrantKeySchema', () => {
  it('accepts valid quadrant keys', () => {
    expect(QuadrantKeySchema.safeParse('urgentImportant').success).toBe(true);
    expect(QuadrantKeySchema.safeParse('notUrgentImportant').success).toBe(true);
    expect(QuadrantKeySchema.safeParse('urgentNotImportant').success).toBe(true);
    expect(QuadrantKeySchema.safeParse('notUrgentNotImportant').success).toBe(true);
  });

  it('rejects invalid quadrant keys', () => {
    expect(QuadrantKeySchema.safeParse('invalid').success).toBe(false);
    expect(QuadrantKeySchema.safeParse('').success).toBe(false);
    expect(QuadrantKeySchema.safeParse(123).success).toBe(false);
  });
});

describe('CreateTaskRequestSchema', () => {
  it('accepts valid create request', () => {
    const result = CreateTaskRequestSchema.safeParse({
      text: 'Buy groceries',
      quadrant: 'urgentImportant',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty text', () => {
    const result = CreateTaskRequestSchema.safeParse({
      text: '',
      quadrant: 'urgentImportant',
    });
    expect(result.success).toBe(false);
  });

  it('rejects text exceeding max length', () => {
    const result = CreateTaskRequestSchema.safeParse({
      text: 'a'.repeat(501),
      quadrant: 'urgentImportant',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid quadrant', () => {
    const result = CreateTaskRequestSchema.safeParse({
      text: 'Buy groceries',
      quadrant: 'invalid',
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing fields', () => {
    expect(CreateTaskRequestSchema.safeParse({}).success).toBe(false);
    expect(CreateTaskRequestSchema.safeParse({ text: 'test' }).success).toBe(false);
    expect(CreateTaskRequestSchema.safeParse({ quadrant: 'urgentImportant' }).success).toBe(false);
  });
});

describe('UpdateTaskRequestSchema', () => {
  it('accepts text-only update', () => {
    const result = UpdateTaskRequestSchema.safeParse({ text: 'Updated text' });
    expect(result.success).toBe(true);
  });

  it('accepts quadrant-only update', () => {
    const result = UpdateTaskRequestSchema.safeParse({ quadrant: 'notUrgentImportant' });
    expect(result.success).toBe(true);
  });

  it('accepts both text and quadrant', () => {
    const result = UpdateTaskRequestSchema.safeParse({
      text: 'Updated text',
      quadrant: 'notUrgentImportant',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty object', () => {
    const result = UpdateTaskRequestSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('rejects empty text', () => {
    const result = UpdateTaskRequestSchema.safeParse({ text: '' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid quadrant', () => {
    const result = UpdateTaskRequestSchema.safeParse({ quadrant: 'invalid' });
    expect(result.success).toBe(false);
  });
});

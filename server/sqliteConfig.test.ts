import { describe, expect, it, vi } from 'vitest';
import { configureSqlitePragmas } from './sqliteConfig.js';

function makeLogger() {
  return {
    warn: vi.fn(),
  };
}

describe('configureSqlitePragmas', () => {
  it('uses WAL by default and enables foreign keys', () => {
    const pragma = vi.fn((source: string) => {
      if (source === 'journal_mode = WAL') {
        return 'wal';
      }

      return undefined;
    });
    const logger = makeLogger();

    const activeMode = configureSqlitePragmas({ pragma }, {}, logger);

    expect(activeMode).toBe('WAL');
    expect(pragma).toHaveBeenNthCalledWith(1, 'journal_mode = WAL', { simple: true });
    expect(pragma).toHaveBeenNthCalledWith(2, 'foreign_keys = ON');
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('respects SQLITE_JOURNAL_MODE when it is valid', () => {
    const pragma = vi.fn((source: string) => {
      if (source === 'journal_mode = DELETE') {
        return 'delete';
      }

      return undefined;
    });
    const logger = makeLogger();

    const activeMode = configureSqlitePragmas(
      { pragma },
      { SQLITE_JOURNAL_MODE: 'delete' },
      logger
    );

    expect(activeMode).toBe('DELETE');
    expect(pragma).toHaveBeenNthCalledWith(1, 'journal_mode = DELETE', { simple: true });
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('falls back to WAL when SQLITE_JOURNAL_MODE is invalid', () => {
    const pragma = vi.fn((source: string) => {
      if (source === 'journal_mode = WAL') {
        return 'wal';
      }

      return undefined;
    });
    const logger = makeLogger();

    const activeMode = configureSqlitePragmas(
      { pragma },
      { SQLITE_JOURNAL_MODE: 'banana' },
      logger
    );

    expect(activeMode).toBe('WAL');
    expect(logger.warn).toHaveBeenCalledWith(
      '[db] Unsupported SQLITE_JOURNAL_MODE="banana", falling back to WAL. Supported values: DELETE, TRUNCATE, PERSIST, MEMORY, WAL, OFF.'
    );
  });

  it('falls back to DELETE when WAL fails because the shared-memory file cannot be resized', () => {
    const pragma = vi.fn((source: string) => {
      if (source === 'journal_mode = WAL') {
        const error = new Error('disk I/O error') as Error & { code?: string };
        error.code = 'SQLITE_IOERR_SHMSIZE';
        throw error;
      }

      if (source === 'journal_mode = DELETE') {
        return 'delete';
      }

      return undefined;
    });
    const logger = makeLogger();

    const activeMode = configureSqlitePragmas({ pragma }, {}, logger);

    expect(activeMode).toBe('DELETE');
    expect(pragma).toHaveBeenNthCalledWith(1, 'journal_mode = WAL', { simple: true });
    expect(pragma).toHaveBeenNthCalledWith(2, 'journal_mode = DELETE', { simple: true });
    expect(pragma).toHaveBeenNthCalledWith(3, 'foreign_keys = ON');
    expect(logger.warn).toHaveBeenCalledWith(
      '[db] SQLite WAL mode is not supported on this volume (SQLITE_IOERR_SHMSIZE). Falling back to DELETE journal mode.'
    );
  });

  it('rethrows unexpected SQLite errors instead of masking them', () => {
    const error = new Error('database is read only');
    const pragma = vi.fn(() => {
      throw error;
    });

    expect(() => configureSqlitePragmas({ pragma }, {})).toThrow(error);
  });
});

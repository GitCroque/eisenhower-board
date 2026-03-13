import { describe, expect, it, vi } from 'vitest';
import { configureSqlitePragmas } from './sqliteConfig.js';

function makeLogger() {
  return {
    warn: vi.fn(),
  };
}

function makeDb(pragmaImpl?: (source: string) => unknown) {
  return {
    pragma: vi.fn(pragmaImpl ?? (() => undefined)),
    close: vi.fn(),
  };
}

describe('configureSqlitePragmas', () => {
  it('uses WAL by default and enables foreign keys', () => {
    const db = makeDb((source) => {
      if (source === 'journal_mode = WAL') return 'wal';
      return undefined;
    });
    const logger = makeLogger();

    const result = configureSqlitePragmas(db, { logger });

    expect(result.journalMode).toBe('WAL');
    expect(result.reopenedDb).toBeUndefined();
    expect(db.pragma).toHaveBeenNthCalledWith(1, 'journal_mode = WAL', { simple: true });
    expect(db.pragma).toHaveBeenNthCalledWith(2, 'foreign_keys = ON');
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('respects SQLITE_JOURNAL_MODE when it is valid', () => {
    const db = makeDb((source) => {
      if (source === 'journal_mode = DELETE') return 'delete';
      return undefined;
    });
    const logger = makeLogger();

    const result = configureSqlitePragmas(db, {
      env: { SQLITE_JOURNAL_MODE: 'delete' },
      logger,
    });

    expect(result.journalMode).toBe('DELETE');
    expect(db.pragma).toHaveBeenNthCalledWith(1, 'journal_mode = DELETE', { simple: true });
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('falls back to WAL when SQLITE_JOURNAL_MODE is invalid', () => {
    const db = makeDb((source) => {
      if (source === 'journal_mode = WAL') return 'wal';
      return undefined;
    });
    const logger = makeLogger();

    const result = configureSqlitePragmas(db, {
      env: { SQLITE_JOURNAL_MODE: 'banana' },
      logger,
    });

    expect(result.journalMode).toBe('WAL');
    expect(logger.warn).toHaveBeenCalledWith(
      '[db] Unsupported SQLITE_JOURNAL_MODE="banana", falling back to WAL. Supported values: DELETE, TRUNCATE, PERSIST, MEMORY, WAL, OFF.'
    );
  });

  it('falls back to DELETE when WAL fails because the shared-memory file cannot be resized', () => {
    const db = makeDb((source) => {
      if (source === 'journal_mode = WAL') {
        const error = new Error('disk I/O error') as Error & { code?: string };
        error.code = 'SQLITE_IOERR_SHMSIZE';
        throw error;
      }
      if (source === 'journal_mode = DELETE') return 'delete';
      return undefined;
    });
    const logger = makeLogger();

    const result = configureSqlitePragmas(db, { logger });

    expect(result.journalMode).toBe('DELETE');
    expect(result.reopenedDb).toBeUndefined();
    expect(db.pragma).toHaveBeenNthCalledWith(1, 'journal_mode = WAL', { simple: true });
    expect(db.pragma).toHaveBeenNthCalledWith(2, 'journal_mode = DELETE', { simple: true });
    expect(db.pragma).toHaveBeenNthCalledWith(3, 'foreign_keys = ON');
    expect(logger.warn).toHaveBeenCalledWith(
      '[db] SQLite WAL mode is not supported on this volume (SQLITE_IOERR_SHMSIZE). Falling back to DELETE journal mode.'
    );
  });

  it('cleans up WAL/SHM files and reopens DB when DELETE fallback also fails', () => {
    const shmError = () => {
      const error = new Error('disk I/O error') as Error & { code?: string };
      error.code = 'SQLITE_IOERR_SHMSIZE';
      throw error;
    };

    const db = makeDb((source) => {
      if (source.startsWith('journal_mode')) shmError();
      return undefined;
    });

    const freshDb = makeDb((source) => {
      if (source === 'journal_mode = DELETE') return 'delete';
      return undefined;
    });

    const onWalCleanup = vi.fn(() => freshDb);
    const logger = makeLogger();

    const result = configureSqlitePragmas(db, { logger, onWalCleanup });

    expect(result.journalMode).toBe('DELETE');
    expect(result.reopenedDb).toBe(freshDb);
    expect(onWalCleanup).toHaveBeenCalledOnce();
    expect(logger.warn).toHaveBeenCalledWith(
      '[db] SQLite WAL mode is not supported on this volume (SQLITE_IOERR_SHMSIZE). Falling back to DELETE journal mode.'
    );
    expect(logger.warn).toHaveBeenCalledWith(
      '[db] DELETE fallback also failed due to stale WAL/SHM files. Cleaning up and reopening database.'
    );
    // foreign_keys should be set on the fresh db, not the original
    expect(freshDb.pragma).toHaveBeenCalledWith('foreign_keys = ON');
  });

  it('rethrows when DELETE fallback fails without onWalCleanup callback', () => {
    const shmError = () => {
      const error = new Error('disk I/O error') as Error & { code?: string };
      error.code = 'SQLITE_IOERR_SHMSIZE';
      throw error;
    };

    const db = makeDb((source) => {
      if (source.startsWith('journal_mode')) shmError();
      return undefined;
    });

    expect(() => configureSqlitePragmas(db, {})).toThrow('disk I/O error');
  });

  it('rethrows unexpected SQLite errors instead of masking them', () => {
    const error = new Error('database is read only');
    const db = makeDb(() => { throw error; });

    expect(() => configureSqlitePragmas(db, {})).toThrow(error);
  });
});

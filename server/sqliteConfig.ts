const SQLITE_JOURNAL_MODES = ['DELETE', 'TRUNCATE', 'PERSIST', 'MEMORY', 'WAL', 'OFF'] as const;

export type SqliteJournalMode = typeof SQLITE_JOURNAL_MODES[number];

interface SqliteDatabase {
  pragma(source: string, options?: { simple?: boolean }): unknown;
  close(): void;
}

export interface SqliteConfigOptions {
  env?: { SQLITE_JOURNAL_MODE?: string };
  logger?: LoggerLike;
  /** Called when WAL files need to be cleaned up before fallback to DELETE mode.
   *  Should close the db, remove -wal/-shm files, and return a fresh db instance. */
  onWalCleanup?: () => SqliteDatabase;
}

interface LoggerLike {
  warn(message: string, ...args: unknown[]): void;
}

function isSqliteJournalMode(value: string): value is SqliteJournalMode {
  return SQLITE_JOURNAL_MODES.includes(value as SqliteJournalMode);
}

function normalizeJournalMode(value: string | undefined, logger: LoggerLike): SqliteJournalMode {
  if (!value) {
    return 'WAL';
  }

  const normalized = value.trim().toUpperCase();
  if (isSqliteJournalMode(normalized)) {
    return normalized;
  }

  logger.warn(
    `[db] Unsupported SQLITE_JOURNAL_MODE="${value}", falling back to WAL. Supported values: ${SQLITE_JOURNAL_MODES.join(', ')}.`
  );
  return 'WAL';
}

function isWalSharedMemoryError(error: unknown): error is { code: string } {
  return (
    typeof error === 'object'
    && error !== null
    && 'code' in error
    && typeof (error as { code?: string }).code === 'string'
    && (error as { code: string }).code.startsWith('SQLITE_IOERR_SHM')
  );
}

function applyJournalMode(db: SqliteDatabase, mode: SqliteJournalMode): SqliteJournalMode {
  const result = db.pragma(`journal_mode = ${mode}`, { simple: true });
  const normalizedResult = typeof result === 'string' ? result.toUpperCase() : mode;

  return isSqliteJournalMode(normalizedResult) ? normalizedResult : mode;
}

export interface ConfigureSqlitePragmasResult {
  journalMode: SqliteJournalMode;
  /** If WAL cleanup was needed, this is the new db instance. Otherwise undefined. */
  reopenedDb?: SqliteDatabase;
}

export function configureSqlitePragmas(
  db: SqliteDatabase,
  options: SqliteConfigOptions = {},
): ConfigureSqlitePragmasResult {
  const { env, logger = console, onWalCleanup } = options;
  const resolvedEnv = env ?? (process.env as Record<string, string | undefined>);
  const requestedJournalMode = normalizeJournalMode(resolvedEnv.SQLITE_JOURNAL_MODE, logger);

  let usedWalFallback = false;
  let activeJournalMode: SqliteJournalMode;
  let activeDb = db;
  try {
    activeJournalMode = applyJournalMode(activeDb, requestedJournalMode);
  } catch (error) {
    if (requestedJournalMode !== 'WAL' || !isWalSharedMemoryError(error)) {
      throw error;
    }

    logger.warn(
      '[db] SQLite WAL mode is not supported on this volume (SQLITE_IOERR_SHMSIZE). Falling back to DELETE journal mode.'
    );
    usedWalFallback = true;

    try {
      activeJournalMode = applyJournalMode(activeDb, 'DELETE');
    } catch (fallbackError) {
      if (!isWalSharedMemoryError(fallbackError) || !onWalCleanup) {
        throw fallbackError;
      }

      logger.warn(
        '[db] DELETE fallback also failed due to stale WAL/SHM files. Cleaning up and reopening database.'
      );
      activeDb = onWalCleanup();
      activeJournalMode = applyJournalMode(activeDb, 'DELETE');
    }
  }

  if (activeJournalMode !== requestedJournalMode && !usedWalFallback) {
    logger.warn(
      `[db] Requested SQLite journal mode ${requestedJournalMode}, but SQLite is using ${activeJournalMode}.`
    );
  }

  activeDb.pragma('foreign_keys = ON');
  return {
    journalMode: activeJournalMode,
    ...(activeDb !== db ? { reopenedDb: activeDb } : {}),
  };
}

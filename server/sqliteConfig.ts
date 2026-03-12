const SQLITE_JOURNAL_MODES = ['DELETE', 'TRUNCATE', 'PERSIST', 'MEMORY', 'WAL', 'OFF'] as const;

export type SqliteJournalMode = typeof SQLITE_JOURNAL_MODES[number];

interface SqliteDatabase {
  pragma(source: string, options?: { simple?: boolean }): unknown;
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

export function configureSqlitePragmas(
  db: SqliteDatabase,
  env?: { SQLITE_JOURNAL_MODE?: string },
  logger: LoggerLike = console
): SqliteJournalMode {
  const resolvedEnv = env ?? (process.env as Record<string, string | undefined>);
  const requestedJournalMode = normalizeJournalMode(resolvedEnv.SQLITE_JOURNAL_MODE, logger);

  let usedWalFallback = false;
  let activeJournalMode: SqliteJournalMode;
  try {
    activeJournalMode = applyJournalMode(db, requestedJournalMode);
  } catch (error) {
    if (requestedJournalMode !== 'WAL' || !isWalSharedMemoryError(error)) {
      throw error;
    }

    logger.warn(
      '[db] SQLite WAL mode is not supported on this volume (SQLITE_IOERR_SHMSIZE). Falling back to DELETE journal mode.'
    );
    usedWalFallback = true;
    activeJournalMode = applyJournalMode(db, 'DELETE');
  }

  if (activeJournalMode !== requestedJournalMode && !usedWalFallback) {
    logger.warn(
      `[db] Requested SQLite journal mode ${requestedJournalMode}, but SQLite is using ${activeJournalMode}.`
    );
  }

  db.pragma('foreign_keys = ON');
  return activeJournalMode;
}

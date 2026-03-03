import { describe, it, expect, beforeEach } from 'vitest';
import { randomUUID, createHash } from 'crypto';
import {
  resetDatabaseSchema,
  findOrCreateUserByEmail,
  createSession,
  getSessionByHash,
  createMagicLink,
  consumeMagicLink,
  getActiveSessionsByUser,
  revokeSessionById,
  deleteSessionById,
  type CreateSessionParams,
} from './db.js';

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function makeSession(userId: string, overrides: Partial<CreateSessionParams> = {}): CreateSessionParams & { rawToken: string } {
  const rawToken = randomUUID();
  return {
    rawToken,
    sessionId: overrides.sessionId ?? randomUUID(),
    userId,
    sessionHash: hashToken(rawToken),
    expiresAt: overrides.expiresAt ?? Date.now() + 30 * 24 * 60 * 60 * 1000,
    createdAt: overrides.createdAt ?? Date.now(),
    ip: overrides.ip ?? '127.0.0.1',
    userAgent: overrides.userAgent ?? 'test-agent',
  };
}

describe('Security: Session absolute lifetime', () => {
  beforeEach(() => {
    resetDatabaseSchema();
  });

  it('returns createdAt in session data', () => {
    const now = Date.now();
    const user = findOrCreateUserByEmail('test@example.com', now);
    const session = makeSession(user.id, { createdAt: now });
    createSession(session);

    const result = getSessionByHash(session.sessionHash, now);
    expect(result).not.toBeNull();
    expect(result!.createdAt).toBe(now);
  });

  it('returns session created 89 days ago (within 90-day absolute limit)', () => {
    const now = Date.now();
    const eightyNineDaysAgo = now - 89 * 24 * 60 * 60 * 1000;
    const user = findOrCreateUserByEmail('test@example.com', now);
    const session = makeSession(user.id, {
      createdAt: eightyNineDaysAgo,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000,
    });
    createSession(session);

    const result = getSessionByHash(session.sessionHash, now);
    expect(result).not.toBeNull();
    expect(result!.createdAt).toBe(eightyNineDaysAgo);
  });

  it('session created 91 days ago should be detectable for rejection', () => {
    const now = Date.now();
    const ninetyOneDaysAgo = now - 91 * 24 * 60 * 60 * 1000;
    const user = findOrCreateUserByEmail('test@example.com', now);
    const session = makeSession(user.id, {
      createdAt: ninetyOneDaysAgo,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000,
    });
    createSession(session);

    const result = getSessionByHash(session.sessionHash, now);
    expect(result).not.toBeNull();
    const SESSION_ABSOLUTE_TTL_MS = 90 * 24 * 60 * 60 * 1000;
    expect(now - result!.createdAt).toBeGreaterThan(SESSION_ABSOLUTE_TTL_MS);
  });
});

describe('Security: Session limit per user', () => {
  beforeEach(() => {
    resetDatabaseSchema();
  });

  it('allows up to 10 sessions per user', () => {
    const now = Date.now();
    const user = findOrCreateUserByEmail('limit@example.com', now);
    const sessions: ReturnType<typeof makeSession>[] = [];

    for (let i = 0; i < 10; i++) {
      const session = makeSession(user.id, { createdAt: now + i });
      createSession(session);
      sessions.push(session);
    }

    const active = getActiveSessionsByUser(user.id, now);
    expect(active).toHaveLength(10);

    for (const s of sessions) {
      const result = getSessionByHash(s.sessionHash, now);
      expect(result).not.toBeNull();
    }
  });

  it('evicts oldest session when creating the 11th', () => {
    const now = Date.now();
    const user = findOrCreateUserByEmail('evict@example.com', now);
    const sessions: ReturnType<typeof makeSession>[] = [];

    for (let i = 0; i < 10; i++) {
      const session = makeSession(user.id, { createdAt: now + i * 1000 });
      createSession(session);
      sessions.push(session);
    }

    const eleventhSession = makeSession(user.id, { createdAt: now + 10 * 1000 });
    createSession(eleventhSession);

    const active = getActiveSessionsByUser(user.id, now);
    expect(active).toHaveLength(10);

    const firstSessionResult = getSessionByHash(sessions[0].sessionHash, now);
    expect(firstSessionResult).toBeNull();

    const eleventhResult = getSessionByHash(eleventhSession.sessionHash, now);
    expect(eleventhResult).not.toBeNull();
  });

  it('does not evict sessions from other users', () => {
    const now = Date.now();
    const user1 = findOrCreateUserByEmail('user1@example.com', now);
    const user2 = findOrCreateUserByEmail('user2@example.com', now);

    const user2Session = makeSession(user2.id);
    createSession(user2Session);

    for (let i = 0; i < 11; i++) {
      const session = makeSession(user1.id, { createdAt: now + i * 1000 });
      createSession(session);
    }

    const user2Result = getSessionByHash(user2Session.sessionHash, now);
    expect(user2Result).not.toBeNull();
  });
});

describe('Security: Session revocation', () => {
  beforeEach(() => {
    resetDatabaseSchema();
  });

  it('lists active sessions for a user', () => {
    const now = Date.now();
    const user = findOrCreateUserByEmail('sessions@example.com', now);

    createSession(makeSession(user.id, { ip: '1.2.3.4', userAgent: 'Chrome' }));
    createSession(makeSession(user.id, { ip: '5.6.7.8', userAgent: 'Firefox' }));

    const sessions = getActiveSessionsByUser(user.id, now);
    expect(sessions).toHaveLength(2);
    expect(sessions[0]).toHaveProperty('ip');
    expect(sessions[0]).toHaveProperty('userAgent');
  });

  it('revokes a specific session by id', () => {
    const now = Date.now();
    const user = findOrCreateUserByEmail('revoke@example.com', now);
    const session1 = makeSession(user.id);
    const session2 = makeSession(user.id);
    createSession(session1);
    createSession(session2);

    const revoked = revokeSessionById(user.id, session1.sessionId);
    expect(revoked).toBe(true);

    const result = getSessionByHash(session1.sessionHash, now);
    expect(result).toBeNull();

    const stillActive = getSessionByHash(session2.sessionHash, now);
    expect(stillActive).not.toBeNull();
  });

  it('cannot revoke sessions belonging to another user', () => {
    const now = Date.now();
    const user1 = findOrCreateUserByEmail('owner@example.com', now);
    const user2 = findOrCreateUserByEmail('attacker@example.com', now);
    const session = makeSession(user1.id);
    createSession(session);

    const revoked = revokeSessionById(user2.id, session.sessionId);
    expect(revoked).toBe(false);

    const result = getSessionByHash(session.sessionHash, now);
    expect(result).not.toBeNull();
  });
});

describe('Security: Magic link token consumption', () => {
  beforeEach(() => {
    resetDatabaseSchema();
  });

  it('magic link can only be used once', () => {
    const now = Date.now();
    const user = findOrCreateUserByEmail('magic@example.com', now);
    const tokenHash = hashToken('test-magic-token');

    createMagicLink({
      id: randomUUID(),
      userId: user.id,
      tokenHash,
      expiresAt: now + 15 * 60 * 1000,
      createdAt: now,
      createdIp: '127.0.0.1',
    });

    const first = consumeMagicLink(tokenHash, now);
    expect(first).not.toBeNull();
    expect(first!.userId).toBe(user.id);

    const second = consumeMagicLink(tokenHash, now);
    expect(second).toBeNull();
  });

  it('expired magic link cannot be consumed', () => {
    const now = Date.now();
    const user = findOrCreateUserByEmail('expired@example.com', now);
    const tokenHash = hashToken('expired-token');

    createMagicLink({
      id: randomUUID(),
      userId: user.id,
      tokenHash,
      expiresAt: now - 1,
      createdAt: now - 15 * 60 * 1000,
      createdIp: '127.0.0.1',
    });

    const result = consumeMagicLink(tokenHash, now);
    expect(result).toBeNull();
  });
});

describe('Security: User data isolation', () => {
  beforeEach(() => {
    resetDatabaseSchema();
  });

  it('session grants access only to the owning user', () => {
    const now = Date.now();
    const user1 = findOrCreateUserByEmail('alice@example.com', now);
    const user2 = findOrCreateUserByEmail('bob@example.com', now);

    const session1 = makeSession(user1.id);
    const session2 = makeSession(user2.id);
    createSession(session1);
    createSession(session2);

    const result1 = getSessionByHash(session1.sessionHash, now);
    expect(result1!.userId).toBe(user1.id);
    expect(result1!.email).toBe('alice@example.com');

    const result2 = getSessionByHash(session2.sessionHash, now);
    expect(result2!.userId).toBe(user2.id);
    expect(result2!.email).toBe('bob@example.com');
  });
});

import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import fs from 'node:fs';

function getDatabaseUrl(): string {
  const url =
    import.meta.env.TURSO_DATABASE_URL ??
    import.meta.env.ASTRO_DB_REMOTE_URL ??
    'file:.data/local.db';

  if (url.startsWith('file:.data/')) {
    try {
      fs.mkdirSync('.data', { recursive: true });
    } catch {}
  }
  return url;
}

function getAuthToken(): string | undefined {
  const token =
    import.meta.env.TURSO_AUTH_TOKEN ?? import.meta.env.ASTRO_DB_APP_TOKEN;
  return token || undefined;
}

const client = createClient({
  url: getDatabaseUrl(),
  authToken: getAuthToken(),
});

export const db = drizzle(client);

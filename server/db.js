import pg from 'pg';

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

export const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      max: 10,
    })
  : null;

export async function initDatabase() {
  if (!pool) {
    console.warn('DATABASE_URL is not set. Database features are disabled.');
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS consultations (
      id TEXT PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      website TEXT,
      service_type TEXT NOT NULL,
      budget TEXT,
      timeline TEXT,
      project_description TEXT NOT NULL,
      additional_info TEXT,
      country TEXT,
      currency TEXT,
      is_nigerian BOOLEAN NOT NULL DEFAULT FALSE,
      discount_applied TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ
    );

    CREATE INDEX IF NOT EXISTS consultations_submitted_at_idx
      ON consultations (submitted_at DESC);

    CREATE INDEX IF NOT EXISTS consultations_status_idx
      ON consultations (status);
  `);
}

export function requireDatabase() {
  if (!pool) {
    const error = new Error('Database is not configured.');
    error.statusCode = 503;
    throw error;
  }

  return pool;
}

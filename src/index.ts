import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db/schema';
import * as relations from './db/relations';

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbUser = process.env.DB_USER || 'user';
const dbPassword = process.env.DB_PASSWORD || 'pass';
const dbName = process.env.DB_NAME || 'actifai';

const pool = new Pool({
  connectionString: `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
});

export const db = drizzle(pool, {
  schema: { ...schema, ...relations }
});

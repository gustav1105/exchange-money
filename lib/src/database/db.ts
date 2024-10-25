import { Pool } from 'pg';
import { loadConfig } from '../config';

const { DATABASE_URL } = loadConfig();
let pool: Pool;

export const initDB = (): void => {
  if (!pool) {
    pool = new Pool({ connectionString: DATABASE_URL });
    pool.on('connect', () => console.log('Database connected.'));
    pool.on('error', (err: Error) => console.error('Database error:', err));
  }
};

export const query = async (text: string, params?: any[]): Promise<any> => {
  if (!pool) throw new Error('Database connection not initialized.');
  return await pool.query(text, params);
};

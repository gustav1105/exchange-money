import { query } from './db';

export const createTableForTodayIfNotExists = async (tableName: string): Promise<void> => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      symbol VARCHAR(10) NOT NULL,
      open DECIMAL(10, 6),
      high DECIMAL(10, 6),
      low DECIMAL(10, 6),
      close DECIMAL(10, 6),
      change DECIMAL(10, 6),
      change_percent DECIMAL(5, 2),
      timestamp BIGINT,
      last_update TIMESTAMP DEFAULT NOW()
    );
  `;
  await query(createTableQuery);
};

export const insertDataIntoTable = async (tableName: string, symbol: string, data: any): Promise<void> => {
  const insertQuery = `
    INSERT INTO ${tableName} (symbol, open, high, low, close, change, change_percent, timestamp, last_update)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
  `;
  await query(insertQuery, [
    symbol, data.open, data.high, data.low, data.close, data.change, data.changePercent, data.timestamp
  ]);
};

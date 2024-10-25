const createTableForTodayIfNotExists = async (tableName: string) => {
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
      timestamp BIGINT,  -- epoch timestamp
      last_update TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `;
  await query(createTableQuery);
  console.log(`Table ${tableName} created or already exists`);
};

const insertDataIntoTable = async (tableName: string, symbol: string, data: any) => {
  const changePercent = parseFloat(data.cp.replace('%', ''));
  const timestamp = parseInt(data.t);  // Assuming 't' is in seconds or milliseconds

  // Log before inserting
  console.log(`Inserting data for ${symbol}: Open: ${data.o}, High: ${data.h}, Low: ${data.l}, Close: ${data.c}, Change: ${data.ch}, Change Percent: ${changePercent}, Timestamp: ${timestamp}`);

  const insertQuery = `
    INSERT INTO ${tableName} (symbol, open, high, low, close, change, change_percent, timestamp, last_update)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
  `;
  await query(insertQuery, [
    symbol,         // symbol (s)
    data.o,         // open (o)
    data.h,         // high (h)
    data.l,         // low (l)
    data.c,         // close (c)
    data.ch,        // change (ch)
    changePercent,  // change_percent (cp)
    timestamp       // timestamp (t)
  ]);

  console.log(`Data for ${symbol} inserted into ${tableName}`);
};


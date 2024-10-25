import { query } from './db';

const getTableNameForToday = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(today.getDate()).padStart(2, '0');
  return `exchange_${year}_${month}_${day}`;
};

const fetchTodayData = async () => {
  const tableName = getTableNameForToday(); // Get today's table name
  try {
    const queryText = `SELECT symbol AS s, open AS o, high AS h, low AS l, close AS c, change AS ch, change_percent AS cp, timestamp AS t, last_update AS tm FROM ${tableName}`;
    const result = await query(queryText);

    if (result.rows.length > 0) {
      console.log(`Data from ${tableName}:`);
      result.rows.forEach(row => {
        console.log(`Symbol: ${row.s}, Open: ${row.o}, High: ${row.h}, Low: ${row.l}, Close: ${row.c}, Change: ${row.ch}, Change Percent: ${row.cp}, Timestamp: ${row.t}, Last Update: ${row.tm}`);
      });
    } else {
      console.log(`No data found in table ${tableName}`);
    }
  } catch (error) {
    console.error(`Error querying table ${tableName}:`, error);
  }
};

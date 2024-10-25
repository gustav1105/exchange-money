// src/scheduler/tasks.ts

import { query } from '../database/db';
import { getSupportedCurrencies } from '../currencies';
import { getForexData } from '../api/forexService';
import { getTableNameForToday } from '../utils/dateUtils';
import { createTableForTodayIfNotExists, insertDataIntoTable } from '../database/tableManagement';

export const runTask = async () => {
  console.log('Running scheduled task...');
  
  try {
    const result = await query('SELECT NOW()');
    console.log('Task ran at:', result.rows[0].now);
    
    // `currencies` is an array of strings
    const currencies = getSupportedCurrencies();
    
    // Pass the currencies directly as symbols to the `getForexData` function
    const forexData = await getForexData(currencies);

    const tableName = getTableNameForToday();
    await createTableForTodayIfNotExists(tableName);
    
    for (let i = 0; i < currencies.length; i++) {
      const symbol = currencies[i];  // No `.symbol` since `currencies[i]` is a string
      const fD = forexData[i];

      console.log(fD);
      await insertDataIntoTable(tableName, symbol, fD);
    }
    
  } catch (error) {
    console.error('Error running task:', error);
  }
};


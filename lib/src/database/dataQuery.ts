import { query } from './db';
import { getTableNameForToday } from '../utils/dateUtils';

export const fetchAvailableDates = async (): Promise<string[]> => {
  try {
    const result = await query(`
      SELECT table_name 
      FROM information_schema.tables
      WHERE table_name LIKE 'exchange_%'
    `);

    const dates = result.rows
      .map((row: { table_name: string }) => row.table_name)
      .filter((tableName: string) => /^exchange_\d{4}_\d{2}_\d{2}$/.test(tableName))
      .map((tableName: string) => tableName.replace('exchange_', '').replace(/_/g, '-'));

    return dates;
  } catch (error) {
    console.error('Error fetching available dates:', error);
    throw error;
  }
};

export const fetchTodayData = async (): Promise<any[]> => {
  const tableName = getTableNameForToday();
  
  try {
    const queryText = `
      SELECT symbol AS s, open AS o, high AS h, low AS l, close AS c, 
             change AS ch, change_percent AS cp, timestamp AS t, 
             last_update AS tm
      FROM ${tableName}
    `;

    const result = await query(queryText);
    
    return result.rows;
  } catch (error) {
    console.error(`Error fetching data for today from table ${tableName}:`, error);
    throw error;
  }
};

/**
 * Fetches the exchange rate for a specific date and currency pair.
 * 
 * @param {string} date - The date in "YYYY-MM-DD" format.
 * @param {string} baseCurrency - The base currency (e.g., "USD").
 * @param {string} counterCurrency - The counter currency (e.g., "EUR").
 * @param {number} amount - The amount in base currency to convert.
 * @returns {Promise<{ rate: number; convertedAmount: number }>} Conversion result and rate.
 */
export const getExchangeRate = async (
  date: string, 
  baseCurrency: string, 
  counterCurrency: string, 
  amount: number
): Promise<{ rate: number; convertedAmount: number }> => {
  const tableName = `exchange_${date.replace(/-/g, '_')}`;
  const queryText = `
    SELECT close 
    FROM ${tableName}
    WHERE symbol = $1
  `;

  try {
    const result = await query(queryText, [`${baseCurrency}/${counterCurrency}`]);

    if (result.rows.length === 0) {
      throw new Error(`No data found for ${baseCurrency}/${counterCurrency} on ${date}`);
    }

    const rate = parseFloat(result.rows[0].close);
    return {
      rate: rate,
      convertedAmount: rate * amount
    };
  } catch (error) {
    console.error(`Error fetching exchange rate for ${baseCurrency}/${counterCurrency} on ${date}:`, error);
    throw error;
  }
};


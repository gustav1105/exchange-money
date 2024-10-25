import { query } from '../database/db';

export const getTableNameForToday = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `exchange_${year}_${month}_${day}`;
};

export const fetchAvailableDates = async (): Promise<string[]> => {
  try {
    // Query for tables that match the 'exchange_' date format pattern
    const result = await query(`
      SELECT table_name 
      FROM information_schema.tables
      WHERE table_name LIKE 'exchange_%'
    `);

    // Extract and format dates from table names
    const dates = result.rows
      .map(row => row.table_name)
      .filter(tableName => /^exchange_\d{4}_\d{2}_\d{2}$/.test(tableName)) // Ensures valid date format
      .map(tableName => 
        tableName.replace('exchange_', '').replace(/_/g, '-')  // Convert to 'yyyy-mm-dd' format
      );

    console.log('Available dates:', dates); // Optional logging for verification
    return dates;

  } catch (error) {
    console.error('Error fetching available dates:', error);
    throw error;
  }
};

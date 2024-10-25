import { initDB, query } from './database/db';  // Ensure the path aligns with your project structure
import { getSupportedCurrencies } from './interface/currencies';
import { getForexData } from './api/fcsapi';
import { getTableNameForToday } from './interface/dates';
import { createTableForTodayIfNotExists, insertDataIntoTable } from './database/mutate';
import { fetchTodayData } from './database/query';

const runTask = async () => {
  console.log('Running scheduled task...');
  
  try {
    const result = await query('SELECT NOW()');
    console.log('Task ran at:', result.rows[0].now);
    
    const currencies = getSupportedCurrencies();
    const forexData = await getForexData(currencies);
    const tableName = getTableNameForToday();

    await createTableForTodayIfNotExists(tableName);
    
    // Iterate over supported currencies and their corresponding data
    for (let i = 0; i < currencies.length; i++) {
      const symbol = currencies[i];
      const fD = forexData[i];  // Assuming forexData matches currencies array in length

      // Log the forex data
      console.log(fD);

      // Insert the data into the table
      await insertDataIntoTable(tableName, symbol, fD);
    }
    
  } catch (error) {
    console.error('Error running task:', error);
  }
};

// Function to calculate milliseconds until midnight
const calculateTimeUntilMidnight = (currentTime: Date): number => {
  const midnight = new Date(currentTime);
  midnight.setHours(24, 0, 0, 0); // Midnight of the next day
  return midnight.getTime() - currentTime.getTime();
};

// Function to start the scheduler
const startScheduler = async () => {
  try {
    const result = await query('SELECT NOW()');
    const currentTime = new Date(result.rows[0].now);
    console.log('Current time from DB:', currentTime);

    const timeUntilMidnight = calculateTimeUntilMidnight(currentTime);
    console.log(`Time until midnight: ${timeUntilMidnight / 1000} seconds`);

    // Schedule the task to run at midnight
    setTimeout(() => {
      runTask(); // First run at midnight
      setInterval(runTask, 24 * 60 * 60 * 1000); // Run every 24 hours after that
    }, timeUntilMidnight);

  } catch (error) {
    console.error('Error setting up scheduler:', error);
  }
};

// Handle graceful shutdown
const handleShutdown = () => {
  console.log('Shutting down gracefully...');
  process.exit(0);
};

// Listen for termination signals (graceful shutdown)
process.on('SIGINT', handleShutdown);  // Handle Ctrl+C
process.on('SIGTERM', handleShutdown); // Handle Docker stop

// Initialize DB connection and run task immediately
const initialize = async () => {
  try {
    console.log('Initializing database connection...');
    await initDB();
    console.log('Database connection initialized.');

    // Run the task immediately after initialization
    await runTask(); 

    // Start the scheduler for midnight and beyond
    await startScheduler();
    await fetchTodayData();
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

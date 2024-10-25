import { runTask } from './tasks';
import { calculateTimeUntilMidnight } from '../utils/dateUtils';

export const startScheduler = async (): Promise<void> => {
  const timeUntilMidnight = calculateTimeUntilMidnight(new Date());
  setTimeout(() => {
    runTask();
    setInterval(runTask, 24 * 60 * 60 * 1000);
  }, timeUntilMidnight);
};


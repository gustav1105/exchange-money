export const getTableNameForToday = (): string => {
  const today = new Date();
  return `exchange_${today.getFullYear()}_${String(today.getMonth() + 1).padStart(2, '0')}_${String(today.getDate()).padStart(2, '0')}`;
};

export const calculateTimeUntilMidnight = (currentTime: Date): number => {
  const midnight = new Date(currentTime);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - currentTime.getTime();
};

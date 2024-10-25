// List of unique currencies
const currencies: string[] = [
  'GBP',
  'USD',
  'EUR',
  'JPY',
  'AUD',
  'CAD',
  'NZD',
  'ZAR'
];

// Function to generate all supported currency pairs
export const getSupportedCurrencies = (): string[] => {
  const pairs: string[] = [];

  for (let i = 0; i < currencies.length; i++) {
    for (let j = i + 1; j < currencies.length; j++) {
      // Create both combinations (e.g., GBP/USD and USD/GBP)
      pairs.push(`${currencies[i]}/${currencies[j]}`);
      pairs.push(`${currencies[j]}/${currencies[i]}`);
    }
  }

  return pairs;
};

// Function to add a new currency dynamically
export const addCurrency = (currency: string): void => {
  if (!currencies.includes(currency)) {
    currencies.push(currency);
  }
};

// Function to remove a currency and update pairs dynamically
export const removeCurrency = (currency: string): void => {
  const index = currencies.indexOf(currency);
  if (index > -1) {
    currencies.splice(index, 1);
  }
};


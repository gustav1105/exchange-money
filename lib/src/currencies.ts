// src/currencies.ts

// List of unique base currencies
const currencies: string[] = [
  'GBP', 'USD', 'EUR', 'JPY', 'AUD', 'CAD', 'NZD', 'ZAR'
];

// Interface for currency pair data
export interface CurrencyPair {
  base: string;
  counter: string;
  symbol: string;
}

/**
 * Generates all supported currency pairs in both directions (e.g., "USD/EUR" and "EUR/USD").
 * 
 * @returns {CurrencyPair[]} Array of currency pair objects.
 */
export const getSupportedCurrencyPairs = (): CurrencyPair[] => {
  const pairs: CurrencyPair[] = [];

  for (let i = 0; i < currencies.length; i++) {
    for (let j = i + 1; j < currencies.length; j++) {
      pairs.push({
        base: currencies[i],
        counter: currencies[j],
        symbol: `${currencies[i]}/${currencies[j]}`
      });
      pairs.push({
        base: currencies[j],
        counter: currencies[i],
        symbol: `${currencies[j]}/${currencies[i]}`
      });
    }
  }

  return pairs;
};

/**
 * Adds a new currency to the list if it does not already exist.
 * 
 * @param {string} currency - The currency code to add.
 */
export const addCurrency = (currency: string): void => {
  if (!currencies.includes(currency)) {
    currencies.push(currency);
  }
};

/**
 * Removes a currency from the list and automatically updates currency pairs.
 * 
 * @param {string} currency - The currency code to remove.
 */
export const removeCurrency = (currency: string): void => {
  const index = currencies.indexOf(currency);
  if (index > -1) {
    currencies.splice(index, 1);
  }
};

/**
 * Retrieves the list of unique base currencies.
 * 
 * @returns {string[]} List of supported base currencies.
 */
export const getSupportedCurrencies = (): string[] => {
  return [...currencies];
};


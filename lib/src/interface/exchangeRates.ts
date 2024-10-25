import { query } from '../database/db';

export const exchangeRate = async (date: string, baseCurrency: string, counterCurrency: string, amount: number) => {
  const tableName = `exchange_${date.replace(/-/g, '_')}`;
  const queryText = `
    SELECT * FROM ${tableName}
    WHERE symbol = $1
  `;
  
  const result = await query(queryText, [`${baseCurrency}/${counterCurrency}`]);
  
  if (result.rows.length === 0) {
    throw new Error(`No data found for ${baseCurrency}/${counterCurrency} on ${date}`);
  }

  const rate = parseFloat(result.rows[0].close);
  return {
    rate: rate,
    convertedAmount: rate * amount
  };
};

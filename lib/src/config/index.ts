import dotenv from 'dotenv';

dotenv.config();

export const loadConfig = () => ({
  FCSAPI_KEY: process.env['FCSAPI_KEY'],
  FCSAPI_URL: 'https://fcsapi.com/api-v3/forex/latest',
  DATABASE_URL: process.env['DATABASE_URL']
});

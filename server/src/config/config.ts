import * as dotenv from 'dotenv'

dotenv.config()

export const CONFIG = {
  POSTGRES_USER: process.env.POSTGRES_USER ?? '',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ?? '',
  POSTGRES_DB: process.env.POSTGRES_DB ?? '',
  POSTGRES_TEST_TEMPLATE_DB:
    process.env.POSTGRES_TEST_TEMPLATE_DB ?? 'solvedex',
  POSTGRES_HOST: process.env.POSTGRES_HOST ?? 'localhost',
  POSTGRES_PORT: process.env.POSTGRES_PORT ?? '5432',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: process.env.PORT ?? '8000',
  RATE_LIMIT_POINTS: process.env.RATE_LIMIT_POINTS ?? '10',
  RATE_LIMIT_DURATION: process.env.RATE_LIMIT_DURATION ?? '1',
  BASE_URL: process.env.BASE_URL ?? 'api/v1',
  JWT_TOKEN: process.env.JWT_SECRET ?? 'secret'
}

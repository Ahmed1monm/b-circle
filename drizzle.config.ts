import 'dotconfig/config';
import type {Config} from 'drizzle-kit';
import config from './src/config';

export default {
    schema: [
        './src/db/models/*.ts',
    ],
    out: './src/db/migrations',
    driver: 'pg',
    dbCredentials: {
        host: config.DATABASE_HOST,
        user: config.DATABASE_USER,
        password: config.DATABASE_PASSWORD,
        database: config.DATABASE_NAME,
        port: Number(config.DATABASE_PORT),
    },
} satisfies Config;
import {drizzle} from 'drizzle-orm/node-postgres';
import {migrate} from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';

import config from "../config";
import {logger} from './logger';

const opts = {
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    host: config.DATABASE_HOST,
    port: Number(config.DATABASE_PORT) || 5432,
    database: config.DATABASE_NAME,
}

const client = new pg.Client(opts);
export const db = drizzle(client);


export const getDb = async (opts: pg.ClientConfig) => {

    await client.connect();

    logger.info(`connected to: ${opts.database}`);

    await migrate(db, {
        migrationsFolder: config.MIGRATIONS_DIR,
    });

    logger.info('database migrated successfully');

    return db;
};

getDb(opts).then((db) => {
    logger.info('db connected and migration done successfully');
}).catch((err) => {
    logger.error('db connection failed', err);
    process.exit(1);
});

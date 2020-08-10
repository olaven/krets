import { Pool, PoolClient, QueryResult } from "pg";

//TODO: should not check NODE_ENV programatically, but separate config from code 
const config = (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") ? null : {
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.SSH_DATABASE_CERTIFICATE,
    }
};

const pool = new Pool(config)

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
});


export const withDatabase =
    <T>(action: (pool: Pool) => Promise<T>) =>
        action(pool);

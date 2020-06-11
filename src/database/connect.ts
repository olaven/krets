import { Pool, PoolClient, QueryResult } from "pg";

//TODO: should not check NODE_ENV programatically, but separate config from code 
const config = (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") ? null : {
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.SSH_DATABASE_CERTIFICATE,
    }
};
const pgPool = new Pool({
    user: 'user',
    database: 'data',
    password: 'pass',
})

//const pgPool = new Pool();
const pgPoolWrapper = {
    async connect() {
        for (let nRetry = 1; ; nRetry++) {
            try {
                const client = await pgPool.connect();
                if (nRetry > 1) {
                    console.info('Now successfully connected to Postgres');
                }
                return client;
            } catch (e) {
                if (e.toString().includes('ECONNREFUSED') && nRetry < 5) {
                    console.info('ECONNREFUSED connecting to Postgres, ' +
                        'maybe container is not ready yet, will retry ' + nRetry);
                    // Wait 1 second
                    await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                    throw e;
                }
            }
        }
    }
};
//console.log('Database config object', config);
//const pool = new Pool(config);

pgPool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
});



export const withDatabase = async <T>(action: (client: PoolClient) => Promise<T>) => {

    const client = await pgPoolWrapper.connect();
    const result = await action(client);
    client.release();

    return result;
};

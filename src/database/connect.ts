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


export const withDatabase = async <T>(action: (pool: Pool) => Promise<T>) => {

    //const client = await pool.connect();
    const result = await action(pool); //action(client) //PoolClient
    //client.release();

    return result;
};

export const firstRow = <T>(result: QueryResult<T>) =>
    result.rowCount > 0 ?
        result.rows[0] :
        null

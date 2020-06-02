import {Pool, PoolClient, QueryResult} from "pg";



const pool = new Pool();
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
});



export const withDatabase = async (action: (client: PoolClient) => Promise<QueryResult<any>>) => {

    const client = await pool.connect();
    const result = await action(client);
    client.release();

    return result;
};

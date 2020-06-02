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

export const fetchTest = () => {

    return withDatabase(async client => {

        const result = await client.query("select * from responses");

        console.log("result from database response: ", result);
        return result;
    })
};

/*

import "reflect-metadata"
import {Connection, createConnection, getConnection, getConnectionManager, getConnectionOptions} from "typeorm";

//TODO: get from environment vars or something
const ENVIRONMENT = process.env.NODE_ENV;

//3 seconds
//initialize database connection
let isConnecting = false, connection: Connection, hasInitialized = false;
const initializeDatabase = async () => {

    //if (hasInitialized) return;

    if (isConnecting) return;
    isConnecting = true;

    //close connection if exists. could contain references to unloaded entities.
    const connections = getConnectionManager();
    if (connections.has(ENVIRONMENT)) {
        await connections.get(ENVIRONMENT).close();
    }

    const options = await getConnectionOptions(ENVIRONMENT);

    //create new connection
    const newConnection = await createConnection(options);

    connection = newConnection;
    isConnecting = false;
    hasInitialized = true;

    //log for debugging
    console.log(`Connection to database "${ENVIRONMENT}" initialized`);
};

//run initialization on script execution.
//for prod this will only happen once, but for dev this will happen every time this module is hot reloaded


//wait for the connection to the database has been established
export const connect = async () => {

    const env = process.env.NODE_ENV;
    const options = await getConnectionOptions(env);
    const manager = getConnectionManager();

    if (manager.has(env))
        return manager.get(env);

    return await createConnection(options);
};

export const closeConnection = async () => {

    const connection = await getConnection(process.env.NODE_ENV);
    await connection.close();
};
*/
import "reflect-metadata"
import {Connection, createConnection, getConnectionManager, getConnectionOptions} from "typeorm";



//TODO: get from environment vars or something
const ENVIRONMENT = process.env.NODE_ENV;
const CONNECTION_ATTEMPT_INTERVAL = 100;
const CONNECTION_TIMEOUT = 3;
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
    const connection = await createConnection(options);
    return connection;

    /*
    await initializeDatabase();
    let waiting = 0;
    while (!connection) {
        await new Promise((resolve) =>
            setTimeout(resolve, CONNECTION_ATTEMPT_INTERVAL)
        );
        waiting += CONNECTION_ATTEMPT_INTERVAL;
        if (waiting > CONNECTION_TIMEOUT) break;
    }
    if (!connection) throw new Error("Database not intiialized");
    return connection;*/
};


//TODO: remove in favour of above connect function
export default class Database {

    static async get() {

        console.log("LET ME TRY TO CONNECT!");
        try {

            return connect()
        } catch (error) {

            console.log("Failed to connect..", error);
        }
    }
}

/*

export default class Database {

    private static connection: Connection;

    /!**
     * Returns the correct
     * connection based on nodeenv
     *!/
    static async get() {

        return this.isDefaultConnection()?
            getConnection():
            getConnection(process.env.NODE_ENV);
    };

    static async connect() {

        try {

            if (this.isDefaultConnection()) {

                this.connection = await createConnection();
            } else {

                const options = await getConnectionOptions(process.env.NODE_ENV);
                this.connection = await createConnection(options);
            }
        } catch (error) {

            console.error("Error connecting to database", error);
            throw error;
        }
    }


    static close() {

        return this.connection.close()
    }

    private static isDefaultConnection() {

        return !(process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development");
    }
}

export const getPostgresConnection = async () => {

    const connectionName = process.env.NODE_ENV;
    console.log("connection name: ", connectionName);
    const options = await getConnectionOptions(connectionName);
    const connectionResult = await createConnection(options);
    return connectionResult

};
*/

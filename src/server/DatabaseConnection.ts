import {getConnectionOptions, createConnection, Connection, getConnection, getConnectionManager} from "typeorm";

export default class DatabaseConnection {

    private static connection: Connection;

    /**
     * Returns the connection object.
     * Instantiates a new connection
     * if not already present.
     */
    static async get() {

        console.log("Existing connection: ", this.connection);
        if (!this.connection) {

            await this.connect()
        }

        return this.connection;
    };

    static async connect() {

        try {

            if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {

                const connectionName = process.env.NODE_ENV;

                const options = await getConnectionOptions(connectionName);
                this.connection = await createConnection(options);
            } else {

                this.connection = await createConnection();
            }

            console.log("Lazily connected to database");
        } catch (error) {

            console.error("Error connecting to database", error);
            throw error;
        }
    }


    static close() {

        return this.connection.close()
    }

}

export const getPostgresConnection = async () => {

    const connectionName = process.env.NODE_ENV;
    console.log("connection name: ", connectionName);
    const options = await getConnectionOptions(connectionName);
    const connectionResult = await createConnection(options);
    return connectionResult

};

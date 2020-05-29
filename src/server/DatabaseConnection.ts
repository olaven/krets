import {getConnectionOptions, createConnection, Connection, getConnection, getConnectionManager} from "typeorm";

export default class DatabaseConnection {

    private static connection: Connection;

    /**
     * Returns the correct
     * connection based on nodeenv
     */
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

import {getConnectionOptions, createConnection, Connection} from "typeorm";

export default class TypeormConnection {

    static connection: Connection;

    static async connect() {

        if (!this.connection) {

            const connectionName = process.env.NODE_ENV;
            const options = await getConnectionOptions(connectionName);

            console.log("options: ", options);
            this.connection = await  createConnection(options);
        }

        return this.connection;
    }
}

export const getPostgresConnection = async () => {

    const connectionName = process.env.NODE_ENV;
    console.log("connection name: ", connectionName);
    const options = await getConnectionOptions(connectionName);
    const connectionResult = await  createConnection(options);
    return connectionResult

};

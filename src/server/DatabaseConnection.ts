import {getConnectionOptions, createConnection, Connection} from "typeorm";

export default class DatabaseConnection {

    private static connection: Connection;

    /**
     * Returns the connection object.
     * Instantiates a new connection
     * if not already present.
     */
    static async get() {

      if (!this.connection) {

          const connectionName = process.env.NODE_ENV;
          const options = await getConnectionOptions(connectionName);

          try {

              this.connection = await createConnection(options);
              console.log("Lazily connected to database");
          } catch (error) {

              console.error("Error connecting to database", error);
              throw error;
          }
      }

      return this.connection;
    };


    static close() {

        return this.connection.close()
    }

}

export const getPostgresConnection = async () => {

    const connectionName = process.env.NODE_ENV;
    console.log("connection name: ", connectionName);
    const options = await getConnectionOptions(connectionName);
    const connectionResult = await  createConnection(options);
    return connectionResult

};

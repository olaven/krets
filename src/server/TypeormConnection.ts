import {getConnectionOptions, createConnection, Connection} from "typeorm";

export default class TypeormConnection {

    private static connection: Connection;
    static async getConnection() {

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

    /*static async connect() {

        if (!this.connection) {

            const connectionName = process.env.NODE_ENV;
            const options = await getConnectionOptions(connectionName);

            this.connection = await  createConnection(options);
        }

        return this.connection;
    }*/

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

import {getConnectionOptions, createConnection} from "typeorm";

export const establishConnection = async () => {

    const options = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection(options)
};
import {Pool, PoolClient, QueryResult} from "pg";
import fs from "fs";
import path from "path";


//TODO: keep config out of code (i.e not programattic check for test)

//path.join(__dirname, '..', 'config', 'dev', 'foobar.json');
const config = process.env.NODE_ENV !== "test"?{

    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(path.join(__dirname, './certificate.crt')).toString(),
  //      key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
  //    cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString()
    }
}:{};

const pool = new Pool(config);

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
});



export const withDatabase = async (action: (client: PoolClient) => Promise<any>) => {

    const client = await pool.connect();
    const result = await action(client);
    client.release();

    return result;
};

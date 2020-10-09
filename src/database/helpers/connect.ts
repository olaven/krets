import { Pool, types } from "pg";


// -- START NOTE: Overriding default conversion to Date object 

// See [this issue](https://github.com/brianc/node-pg-types/issues/50) for details
const TYPE_TIMESTAMP = 1114
const TYPE_TIMESTAMPTZ = 1184

//NOTE: Overriding default conversion to Date object 
types.setTypeParser(TYPE_TIMESTAMP, v => v)
types.setTypeParser(TYPE_TIMESTAMPTZ, v => v)

// -- END NOTE: Overriding default conversion to Date object 

//TODO: should not check NODE_ENV programatically, but separate config from code 
const config = (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") ? null : {
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.SSH_DATABASE_CERTIFICATE,
    }
};

const pool = new Pool(config)

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
});


export const withDatabase =
    <T>(action: (pool: Pool) => Promise<T>) =>
        action(pool);

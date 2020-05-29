import "reflect-metadata";

import { createServer } from 'http'
import next from 'next'
const { parse } = require('url');
import TypeormConnection from "./TypeormConnection";


const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

/*
TypeormConnection.connect()
    .then(() => {

        console.log("Connected to database");
        app.prepare().then(async () => {

            createServer((req, res) => {

                const parsedUrl = parse(req.url, true);
                handle(req, res, parsedUrl)

            }).listen(port, () => {

                console.log(`Listening on ${port} as ${process.env.NODE_ENV}`)
            })
        });
    })
    .catch((error) => console.error("Could not connect to database", error));

*/

import "reflect-metadata";
import {createConnection} from "typeorm";

import { createServer } from 'http'
import next from 'next'


const port = parseInt(process.env.PORT || '3000', 10);
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });

app.prepare().then(() => {
  createServer().listen(port);

  // tslint:disable-next-line:no-console
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );

createConnection().then(connection => {
    
  console.log("CONNECTED TO DATABASE");
});

}).catch(error => console.log(error));

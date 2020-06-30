// server.ts
//const { readFileSync } = require("fs");
const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

//TODO: remove this line 

console.log("env here:", process.env);

const httpsOptions = dev ? {} : {
    key: process.env.SSL_PRIVKEY.replace(/\\n/gm, '\n').replace(/\r/gm, ""), // readFileSync(process.env.SSL_PRIVKEY),
    cert: process.env.SSL_FULLCHAIN.replace(/\\n/gm, '\n').replace(/\r/gm, ""), // readFileSync(process.env.SSL_FULLCHAIN),
    //ca: process.env.SSL_CHAIN.replace(/\\n/gm, '\n').replace(/\r/gm, ""), // readFileSync(process.env.SLL_CHAIN)
};

console.log("httpsoptions: ", httpsOptions);

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const parsedUrl = parse(req.url, true)
        //const { pathname, query } = parsedUrl

        handle(req, res, parsedUrl);
    }).listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})

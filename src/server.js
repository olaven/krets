// server.ts
const { readFileSync } = require("fs");
const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

//TODO: remove this line 

console.log("HER ER JEG");
console.log({ HTTPS_CONTAINER_PRIVKEY, HTTPS_CONTAINER_FULLCHAIN, HTTPS_CONTAINER_CHAIN } = process.env);

const httpsOptions = dev ? {} : {
    key: readFileSync(process.env.HTTPS_CONTAINER_PRIVKEY),
    cert: readFileSync(process.env.HTTPS_CONTAINER_FULLCHAIN),
    ca: readFileSync(process.env.HTTPS_CONTAINER_CHAIN)
};

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

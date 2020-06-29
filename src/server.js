// server.ts
const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = dev ? {} : {
    key: fs.readFileSync(process.env.HTTPS_CONTAINER_PRIVKEY),
    cert: fs.readFileSync(process.env.HTTPS_CONTAINER_FULLCHAIN),
    ca: fs.readFileSync(process.env.HTTPS_CONTAINER_CHAIN)
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

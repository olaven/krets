import { NextApiRequest, NextApiResponse } from 'next'


export default async function test(req: NextApiRequest, res: NextApiResponse) {

    res.status(200)
    res.send("Hello, test")
}
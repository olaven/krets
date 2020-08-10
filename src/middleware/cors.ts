import { NextApiHandler } from "next";
import Cors from "micro-cors";

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
    origin: process.env.NODE_ENV === "production" ?
        "https://krets.app" :
        "localhost"
});

export const KretsCors = (handler: NextApiHandler) =>
    cors(handler)
import auth0 from "../auth/auth0";
import { NextApiHandler } from "next";
import { IApiRoute } from "@auth0/nextjs-auth0/dist/handlers/require-authentication";
import { withCors } from "./withCors";

export const withAuthentication = (handler: IApiRoute) =>
    auth0.requireAuthentication(handler)
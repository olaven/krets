import auth0 from "../auth/auth0";
import { IApiRoute } from "@auth0/nextjs-auth0/dist/handlers/require-authentication";

export const withAuthentication = (handler: IApiRoute) =>
    auth0.requireAuthentication(handler)
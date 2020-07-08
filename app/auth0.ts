import {
    initAuth0
} from '@auth0/nextjs-auth0';


const config = (typeof window === "undefined") ?
    {
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
        AUTH0_SCOPE: process.env.AUTH0_SCOPE,
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        REDIRECT_URI: process.env.REDIRECT_URI,
        POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
        SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
        SESSION_COOKIE_LIFETIME: process.env.SESSION_COOKIE_LIFETIME
    } : {
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        AUTH0_SCOPE: process.env.AUTH0_SCOPE,
        AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        REDIRECT_URI: process.env.REDIRECT_URI,
        POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
        SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET
    };

export default initAuth0({
    domain: config.AUTH0_DOMAIN as string,
    clientId: config.AUTH0_CLIENT_ID as string,
    clientSecret: config.AUTH0_CLIENT_SECRET,
    scope: 'openid profile',
    redirectUri: config.REDIRECT_URI as string,
    postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT_URI as string,
    session: {
        // The secret used to encrypt the cookie.
        cookieSecret: config.SESSION_COOKIE_SECRET as string,
        // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
        cookieLifetime: 60 * 60 * 8,
        // (Optional) The cookie domain this should run on. Leave it blank to restrict it to your domain.
        //cookieDomain: 'your-domain.com', //TODO: add krets.app? 
        // (Optional) SameSite configuration for the session cookie. Defaults to 'lax', but can be changed to 'strict' or 'none'. Set it to false if you want to disable the SameSite setting.
        cookieSameSite: 'lax',
        // (Optional) Store the id_token in the session. Defaults to false.
        storeIdToken: false,
        // (Optional) Store the access_token in the session. Defaults to false.
        storeAccessToken: true,
        // (Optional) Store the refresh_token in the session. Defaults to false.
        storeRefreshToken: false
    },
    oidcClient: {
        // (Optional) Configure the timeout in milliseconds for HTTP requests to Auth0.
        httpTimeout: 2500,
        // (Optional) Configure the clock tolerance in milliseconds, if the time on your database is running behind.
        clockTolerance: 10000
    }
});
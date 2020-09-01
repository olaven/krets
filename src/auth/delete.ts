import request from "request";

const tokenOptions = {
    method: 'POST',
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`
    }
};

const getAuth0Token = () => new Promise((resolve, reject) => {
    request(tokenOptions, (error, response, body) => {

        if (error) reject(error);

        const json = JSON.parse(body)
        resolve(json.access_token);
    });
});


export const deleteAuthUser = async (id: string) => {

    const token = await getAuth0Token();

    const { status, body } = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${token}`,
            "cache-control": "no-cache",
        }
    });

    if (status !== 204) {
        throw `Error when deleting auth0 user, ${status} ${body}`;
    }
}
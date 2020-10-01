import { getAuth0Token } from "./auth0";

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
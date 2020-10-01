import { get, OK } from "node-kall";
import { AuthModel } from "../models/models";
import { getAuth0Token } from "./auth0"

export const getAuthUser = async (id: string): Promise<[number, AuthModel?]> => {

    const token = await getAuth0Token(); //kall <3 
    const [status, authUser] = await get<AuthModel>(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`,
        }
    });

    return [status, authUser]
}
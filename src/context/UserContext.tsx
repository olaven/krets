import { createContext, useState, useEffect } from "react";
import { get, OK } from "node-kall";
import { AuthModel, UserModel } from "../models";

interface IUserContext {
    databaseUser: UserModel,
    authUser: AuthModel,
    updateUser: (user: AuthModel) => void
}

export const UserContext = createContext<IUserContext>({
    databaseUser: null, authUser: null, updateUser: () => { }
});

export const UserContextProvider = props => {

    const [authUser, setAuthUser] = useState<AuthModel>(null);
    const [databaseUser, setDatabaseuser] = useState<UserModel>(null);

    const updateUser = async () => {

        const [status, authUser] = await get<AuthModel>('/api/auth/me');
        if (status === OK) {

            setAuthUser(authUser);
        } else {

            setAuthUser(null);
            console.warn("Could not fetch auth user data", status);
        }
    };

    useEffect(() => {
        (async () => {

            if (!authUser) {
                setDatabaseuser(null);
                return;
            }

            const [status, databaseUser] = await get<UserModel>(`api/users/${authUser.sub}`);
            if (status === OK) {

                setDatabaseuser(databaseUser);
            }
        })()
    }, [authUser])

    useEffect(() => { updateUser(); }, []);


    return <UserContext.Provider value={{ authUser, databaseUser, updateUser }}>
        {props.children}
    </UserContext.Provider>
};
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
        setAuthUser(
            status === OK ?
                authUser :
                null
        )
    };

    useEffect(() => {
        updateUser()
    }, []);
    useEffect(() => {
        (async () => {

            if (!authUser) return;

            const [status, databaseUser] = await get<UserModel>(`api/users/${authUser.sub}`);
            setDatabaseuser(
                status === OK ?
                    databaseUser :
                    null
            );
        })();
    }, [authUser]);


    return <UserContext.Provider value={{ authUser, databaseUser, updateUser }}>
        {props.children}
    </UserContext.Provider>
};
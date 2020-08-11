import { createContext, useState, useEffect, SetStateAction } from "react";
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


/**
 * This adds negligible value apart from being fun :sweat_smile: 
 * @param path 
 * @param setter 
 */
const getAndSet = <T extends unknown>(path: string, setter: React.Dispatch<SetStateAction<T>>) =>
    async () => {

        const [status, retrievedData] = await get<any>(path);
        setter(
            status === OK ?
                retrievedData :
                null
        )
    }


export const UserContextProvider = props => {

    const [authUser, setAuthUser] = useState<AuthModel>(null);
    const [databaseUser, setDatabaseuser] = useState<UserModel>(null);

    //scoped in function, as it should be provided to consumers
    const updateUser =
        getAndSet<AuthModel>('/api/auth/me', setAuthUser);


    useEffect(() => {
        updateUser()
    }, []);
    useEffect(() => {

        if (!authUser) return;
        getAndSet<UserModel>(`api/users/${authUser.sub}`, setDatabaseuser)();
    }, [authUser])


    return <UserContext.Provider value={{ authUser, databaseUser, updateUser }}>
        {props.children}
    </UserContext.Provider>
};
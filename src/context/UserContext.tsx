import { createContext, useState, useEffect, SetStateAction } from "react";
import { get, OK } from "node-kall";
import { AuthModel, UserModel } from "../models/models";
import { asyncEffect } from "../effects/asyncEffect";

interface IUserContext {
    databaseUser: UserModel,
    authUser: AuthModel,
    loading: boolean,
    updateUser: (user: AuthModel) => void
}

export const UserContext = createContext<IUserContext>({
    databaseUser: null, loading: true, authUser: null, updateUser: () => { }
});

/**
 * Runs a HTTP GET on the given path and 
 * updates state with returned value, if it was successful
 * @param path 
 * @param setter 
 *
 * NOTE: This adds negligible value apart from being fun :sweat_smile: 
 * NOTE: Be slightly careful here, this does not report errors. 
 * TODO: Generalize and reuse, as its use is not specific to `UserContext.tsx` 
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
    const [loading, setLoading] = useState(true);

    //scoped in function, as it should be provided to consumers
    const updateUser =
        getAndSet<AuthModel>('/api/auth/me', setAuthUser);


    asyncEffect(async () => {

        await updateUser();
        setLoading(false);
    }, []);
    useEffect(() => {

        if (!authUser) return;
        getAndSet<UserModel>(`api/users/${authUser.sub}`, setDatabaseuser)();
    }, [authUser])


    return <UserContext.Provider value={{ authUser, loading, databaseUser, updateUser }}>
        {props.children}
    </UserContext.Provider>
};
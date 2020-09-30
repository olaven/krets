
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Loader } from "./tiny/loader";

/**
 * Blocks content if user is not admin
 * @param WrappedComponent component to render 
 */
export const AdminWrapper = (WrappedComponent: () => ReactElement) =>
    (props) => {

        const { databaseUser, authUser, loading } = useContext(UserContext);
        const router = useRouter();

        const [admin, setAdmin] = useState(false);

        useEffect(() => {


            console.log("auth: ", authUser);
            console.log("user: ", databaseUser);
            //setAdmin()
        }, [databaseUser]);

        useEffect(() => {

            if (!admin && !loading)
                router.replace("/");
        }, [admin]);

        if (admin) {
            console.log("admi ner truthy", admin);
        }

        return admin ?//FIXME: update
            <WrappedComponent /> :
            <div>Noe helt annet</div>
    }

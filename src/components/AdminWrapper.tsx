import { ReactElement, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import * as text from "../../src/text"

/**
 * Blocks content if user is not admin
 * @param WrappedComponent component to render 
 */
export const AdminWrapper = (WrappedComponent: () => ReactElement) =>
    (props) => {

        const { databaseUser, loading } = useContext(UserContext);
        const [admin, setAdmin] = useState(false);


        useEffect(() => {

            setAdmin(databaseUser?.role === 'administrator');
        }, [databaseUser]);

        return admin ?
            <WrappedComponent {...props} /> :
            <div>{text.administratorPage.denied}</div>
    }

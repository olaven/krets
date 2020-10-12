
import { useRouter } from "next/router";
import { ReactElement, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Loader } from "./standard/loader";

/**
 * Redirects to `/user` if user is not a subscriber. 
 * Renders given component if not
 * @param WrappedComponent component to render 
 */
export const SubscriberWrapper = (WrappedComponent: () => ReactElement) =>
    (props) => {

        const { databaseUser } = useContext(UserContext);
        const router = useRouter();

        const [lacksSubscription, setLacksSubscription] = useState(false);

        useEffect(() => {

            setLacksSubscription(databaseUser && !databaseUser.active);
        }, [databaseUser]);

        useEffect(() => {

            if (lacksSubscription)
                router.replace("/user");
        }, [lacksSubscription]);

        return lacksSubscription ?
            <Loader size={150} /> :
            <WrappedComponent {...props} />
    }

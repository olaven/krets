// <3 
import { useState, useEffect } from "react";

const Index = () => {

    const [user, setUser] = useState(null);

    const fetchUser = async () => {

        const response = await fetch("/api/auth/me");
        console.log(response);
        if (response.status === 200) {

            const user = await response.json();
            setUser(user);
        }

    }
    useEffect(() => { fetchUser() }, []);

    return <>
        <a href="/api/auth/login">login</a>
        {user && <div>
            Logged in as: {user.name}
        </div>}
    </>
}

export default Index; 
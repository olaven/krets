import auth0 from "../auth/auth0";
import { useEffect } from "react";

function HomePage() {

    const fetchUser = async () => {

        console.log("Running fetch user")
        const res = await fetch('/api/me');
        if (res.ok) {
            const user = await res.json()
            console.log(user);
        } else {

            console.error(res)
        }
    }

    useEffect(() => { fetchUser }, []);


    return <div > 
        <h1>Welcome to Next.js! </h1>
        < a href="/api/login"> Login</a>
        <a href="/api/logout">Logout</a>
        <button onClick={fetchUser}>fetch user</button>
    </div>
}

export default HomePage

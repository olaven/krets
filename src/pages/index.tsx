import auth0 from "../auth/auth0";
import { useEffect } from "react";
import { Heading, Button, Link } from "rebass"

const HomePage = () => {

    const fetchUser = async () => {

        console.log("Running fetch user");
        const res = await fetch('/api/me');
        if (res.ok) {
            const user = await res.json()
            console.log(user);
        } else {

            console.error(res)
        }
    }

    const fetchProtecteRoute = async () => {

        const response = await fetch("/api/protected");
        console.log(response);
    }

    useEffect(() => { fetchUser }, []);


    return <div> 
        <Heading fontSize={[ 5, 6, 7 ]} color='primary'>
            Velkommen til Krets
        </Heading>
        <Link href="/api/login"> Login</Link>
        <Link href="/api/logout">Logout</Link>
        <Button onClick={fetchUser} variant='primary'>fetch user</Button>
        <Button onClick={fetchProtecteRoute}>fetch protected route</Button>
    </div>
}

export default HomePage

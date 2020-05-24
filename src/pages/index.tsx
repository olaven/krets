import auth0 from "../auth/auth0";
import { useEffect, useState } from "react";
import { Heading, Button, Link } from "rebass"

const HomePage = () => {

    /* const fetchUser = async () => {

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
    } */


    const [ user, setUser ] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {

            console.log("Running fetch user");
            const res = await fetch('/api/me');
            if (res.ok) {
                const user = await res.json()
                setUser(user);
                console.log(user);
            } else {

                setUser(null);
                console.error(res)
            }

        
        }

        fetchUser(); 
    }, [])


    


    return <div> 
        <Heading fontSize={[ 5, 6, 7 ]} color='primary'>
            Velkommen til Krets
        </Heading>
        <Link href="/api/login"> Login</Link>
        <Link href="/api/logout">Logout</Link>
        {user? 
            <div>du er logget inn som {user.name}</div>: 
            <div>Du er ikke logget inn</div>}
        {/* <Button onClick={fetchUser} variant='primary'>fetch user</Button>
        <Button onClick={fetchProtecteRoute}>fetch protected route</Button> */}
    </div>
}

export default HomePage

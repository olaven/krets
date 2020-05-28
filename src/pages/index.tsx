import { useEffect, useState } from "react";
import { Heading, Button, Link } from "rebass"

const HomePage = () => {

    const [ user, setUser ] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {

            const res = await fetch('/api/auth/me');
            if (res.ok) {

                const user = await res.json();
                setUser(user);
            } else {

                setUser(null);
                console.error(res)
            }

        
        };

        fetchUser(); 
    }, []);


    

    const fetchBrand = async () => {

        const response = await fetch("api/brands/brand-id/id");
        console.log(response);
    };

    return <div>
        <Heading fontSize={[ 5, 6, 7 ]} color='primary'>
            Velkommen til Krets
        </Heading>
        <Link href="/api/auth/login"> Login</Link>
        <Link href="/api/auth/logout">Logout</Link>

        <button onClick={fetchBrand}>fetch api</button>

        {user? 
            <div>du er logget inn som {user.name}</div>: 
            <div>Du er ikke logget inn</div>}
        {/* <Button onClick={fetchUser} variant='primary'>fetch user</Button>
        <Button onClick={fetchProtecteRoute}>fetch protected route</Button> */}
    </div>
}

export default HomePage

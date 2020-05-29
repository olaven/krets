import React, { useEffect, useState } from "react";
import { Heading, Button, Link } from "rebass"
import {AuthContext} from "../context/AuthContext";

const HomePage = () => {

    const { user } = React.useContext(AuthContext);


    

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

import { React } from "../../frontend_deps.ts";
import { Register } from "./register/register.jsx";


console.log(React.createElement)
export const Home = () => {

    console.log(window.location);
    return <div>
        <h1>Velkommen til Krets.</h1>
        <Register/>    
    </div>
}
import { h, useContext } from "../deps_frontend.js"
import { AuthContextProvider, AuthContext } from "../context/auth_context.js"

//TODO: some kind of color system: https://colors.lol/

const header_style = {
    overflow: "hidden",
    backgroundColor: "seagreen",
    color: "white",
    width: "100%",
    padding: "0",
    margin: "0"
}

const footer_style = {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "seagreen",
    color: "white",
    textAlign: "center"
}


const Header = () => {

    const { user, login_uri } = useContext(AuthContext);

    const LoginButton = user? 
        () => h`<p>You are logged in as ${user.name}</p>`:
        () => h`<a href=${login_uri}>login/signup</a>`

    return h`<div style=${header_style}>
        <h1>Krets.</h1>
        <${LoginButton}/>
    </div>`
}

const Footer = () => {

    return h`<div style=${footer_style}>
        om Krets.
    </div>`
}

/**
 * Wraps site layout 
 * props.auth0 = { auth0_client_id, auth0_domain, host_uri } 
 */
const Layout = (props) => {

    return h`<${AuthContextProvider} auth0=${props.auth0}>
        <${Header}>
            Krets.
        </${Header}>
        <div>
            ${props.children}
        </div> 
        <${Footer}/>
    </${AuthContextProvider}>`
}


export default Layout;
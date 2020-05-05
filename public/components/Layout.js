import { h } from "../deps_frontend.js"
import { AuthContextProvider } from "../context/auth_context.js"

//TODO: some kind of color system: https://colors.lol/

const Header = () => {

    const style = {
        overflow: "hidden",
        backgroundColor: "seagreen",
        color: "white", 
        width: "100%",
        padding: "0", 
        margin: "0"
    }

    return h`<div style=${style}>
        <h1>Krets.</h1>
    </div>`
}

const Footer = () => {

    const style = {
        position: "fixed", 
        left: 0, 
        bottom: 0, 
        width: "100%", 
        backgroundColor: "seagreen", 
        color: "white",
        textAlign: "center"
    }

    return h`<div style=${style}>
        om Krets.
    </div>`
}

const Layout = (props) => {

    return h`<${AuthContextProvider}>
        <${Header}}>
            Krets.
        </${Header}>
        <div>
            ${props.children}
        </div> 
        <${Footer}/>
    </${AuthContextProvider}>`
}


export default Layout;
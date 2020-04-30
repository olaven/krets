import { h } from "../deps_frontend.js"

const Layout = (props) => {

    return h`<div>
        Layout header
        ${props.children}
        Layout footer
    </div>`
}


export default Layout;
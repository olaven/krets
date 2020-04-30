import { h } from "../deps_frontend.js"

const Layout = (props) => {

    return h`<div>
        Layout header
        <div>
            ${props.children}
        </div>
        Layout footer
    </div>`
}


export default Layout;
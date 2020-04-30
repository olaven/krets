import { h } from "../deps_frontend.js"


const Brand = (props) => {
    
    const { name } = props

    return h `
        <div style=${{color: "red"}}>Brand name: ${name}</div>
    `
}

export default Brand
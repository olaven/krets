import { h } from "../../deps_component.js"

const Brand = (props) => {

    const { name } = props
    console.log("rendered");
    return h `
        <div>Brand name: ${name}</div>
        <button onClick=${() => {console.log("brand trigerd")}}>trigger</buton>
    `
}

export default Brand
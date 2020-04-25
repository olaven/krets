import { h } from "../../deps_component.js"

export const Home = () => {

  return h`
    <div>Functional Rendered</div>
    <button onClick=${() => { console.log("triggered") }}>Trigger JS</button>
  `
}

import { h } from "../deps_component.js"

const Home = () => {

  return h`
    <div>Functional Rendered</div>
    <button onClick=${() => { console.log("triggered") }}>Trigger JS</button>
  `
}


export default Home;
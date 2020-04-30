import { h, useState } from "../deps_frontend.js"

const Home = () => {
  
  const [ name, setName ] = useState("state not set");


  return h`
    <div>Functional Rendered</div>
    <button onClick=${() => { setName("Changed") }}>Trigger JS</button>
    <div>${name}</div>
  `
}


export default Home;
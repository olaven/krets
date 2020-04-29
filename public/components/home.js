import { h, useState } from "../deps_frontend.js"

const Home = () => {
  
  const [ name, setName ] = useState("state not set");


  return h`
    <div>Functional Rendered</div>
    ${name}
    <button onClick=${() => { setName("Changed") }}>Trigger JS</button>
  `
}


export default Home;
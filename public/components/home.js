import { h, useState } from "../deps_frontend.js"

const Home = () => {
  
  


  return h`
    <div>Functional Rendered</div>
  
    <button onClick=${() => { setName("Changed") }}>Trigger JS</button>
  `
}


export default Home;
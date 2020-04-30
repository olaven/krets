import Layout from "./layout.js";
import { h, useState } from "../deps_frontend.js"
import { post } from "../utils.js";


const Home = () => {

  const [ name, setName ] = useState("");

  const onRegister = async () => {

    const response = await post("/api/brands", { name });
    if (response.status === 201) {

      console.log("laget")
    } else {
      
      console.log("feil her: ", response)
    }
  }

  return h`<${Layout}>
      <h1>Krets</h1>
      <input type="text" placeholder="ditt navn" value="${name}" onChange=${(event) => {setName(event.target.value)}}></input>
      <button onClick=${onRegister}>registrer</button>
  </${Layout}>`
}


export default Home;
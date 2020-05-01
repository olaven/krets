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
      <input type="text" placeholder="ditt navn" value="${name}" onChange=${(event) => {setName(event.target.value)}}></input>
      <button onClick=${onRegister}>registrer</button>

      <script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>
        <div id="appleid-signin" data-color="black" data-border="true" data-type="sign in"></div>
        <script type="text/javascript">
            AppleID.auth.init({
                clientId : '[CLIENT_ID]',
                scope : '[SCOPES]',
                redirectURI : '[REDIRECT_URI]',
                state : '[STATE]',
                usePopup : true //or false defaults to false
            });
        </script>
  </${Layout}>`
}


export default Home;
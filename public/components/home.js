import Layout from "./layout.js";
import { h, useContext } from "../deps_frontend.js"
import { http, url } from "../utils/utils.js";
import { AuthContext } from "../context/auth_context.js";



const Home = (props) => {

  const context = useContext(AuthContext);  

  const fetch_user = async () => {

      const endpoint = `https://krets.eu.auth0.com/userinfo`;
      const { access_token } = url.parse_hash(endpoint);

      const response = await http.get(endpoint, {
          headers: {
              "Authorization": `Bearer ${access_token}`
          } 
      }); 

      console.log(response)
      const text = await response.text();
      console.log("text: ", text);
  }

  const retrieve_token = async () => {

    //const url = "https://krets.eu.auth0.com/authorize"
    const url = "/api/authorize";
    const response = await http.get(url); 
    console.log(response);
  }

  return h`<${Layout} auth0=${props}>
      <button onClick=${fetch_user}>fetch user</button>
      <button onClick=${retrieve_token}>retrive token</button>
  </${Layout}>`
}


export default Home;
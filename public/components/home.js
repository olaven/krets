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

      const body = await response.json()
      console.log(body)
  }

  return h`<${Layout} auth0=${props}>
      <button onClick=${fetch_user}>fetch user</button>
  </${Layout}>`
}


export default Home;
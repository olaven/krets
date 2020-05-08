import Layout from "./layout.js";
import { h } from "../deps_frontend.js"



const Home = (props) => {

  return h`<${Layout} auth0=${props}>
      Krets home page
  </${Layout}>`
}


export default Home;
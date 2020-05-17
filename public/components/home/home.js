import { h } from "../../deps_frontend.js"
import Layout from "../layout.js";
import { BrandSection } from "./brand_section.js"

const Home = (props) => {

  return h`<${Layout} auth0=${props}>
      
      <${BrandSection}/>
  </${Layout}>`
}


export default Home;
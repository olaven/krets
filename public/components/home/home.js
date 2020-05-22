import { h } from "../../deps_frontend.js"
import Outline from "../outline.js";
import { BrandSection } from "./brand_section.js"

const Home = (props) => {

  return h`<${Outline} auth0=${props}>
      
      <${BrandSection}/>
  </${Outline}>`;
}


export default Home;
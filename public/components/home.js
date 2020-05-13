import Layout from "./layout.js";
import { AuthContext } from "../context/auth_context.js";
import { h, useContext, useState, useEffect } from "../deps_frontend.js"

/**
 * Hook -> returns brands relevant for the user. 
 */
const use_brands = (user) => {

  const [ brands, setBrands ] = useState([]);

  const fetch_brands = () => {

    if (user) {

      //NOTE: using auth0 user object. Probably cleaner to use database version later.
      const id = user.sub
      //TODO: fetch brands owned by user 
    }
  }

  return brands;
} 

const Home = (props) => {

  const { user } = useContext(AuthContext);

  return h`<${Layout} auth0=${props}>
      Krets home page
  </${Layout}>`
}


export default Home;
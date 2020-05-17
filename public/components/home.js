import Layout from "./layout.js";
import { AuthContext } from "../context/auth_context.js";
import { http } from "../utils/utils.js";
import { h, useContext, useState, useEffect } from "../deps_frontend.js"

/**
 * Hook -> returns brands relevant for the user. 
 */
const use_brands = (user) => {

  const [ brands, setBrands ] = useState([]);

  const fetch_brands = async () => {

    if (user) {

      //NOTE: using auth0 user object. Probably cleaner to use database version later.
      const id = user.sub
      const response = await http.get(`/api/brands?id=${id}`); 
      
      if (response.status === 200) {

        const brands = await response.json();
        setBrands(brands);
      } else {

        console.warn(`${response.status} when fetching brands.`);
        setBrands([]);
      }
    }
  }

  useEffect(fetch_brands, [user]);

  return brands;
} 

const BrandList = () => {

  const { user } = useContext(AuthContext);
  const brands = use_brands(user);
  
  return h`<h2>Dine navn:</h2>
    ${brands.map(brand => 
      h`<div>${brand.name}</div>`  
    )}`;
}

const Home = (props) => {


  return h`<${Layout} auth0=${props}>
      Krets home page
      
      <${BrandList}/>
  </${Layout}>`
}


export default Home;
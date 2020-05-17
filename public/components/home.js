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
  
  return h`<h2>Dine sider:</h2>
    ${brands.map(brand => 
      h`<div>${brand.name}</div>`  
    )}`;
}

const BrandCreator = () => {

  const { user } = useContext(AuthContext); 
  const [ name, setName ] = useState("");

  const updateName = event => {

    const name = event.target.value; 
    setName(name);
  }

  const postBrand = async () => {

    const id = user.sub //NOTE: using auth0 user for now 
    const brand = { name, owner_id: user.sub}
    const response = await http.post(`/api/brands`, brand);

    if (response.status === 201) {

      console.log("CREATED");
    } else if (response.status === 409) {

      //TODO: kontinuerlig sjekk? 
      console.log("Already exists.")
    } else {

      console.error("En feil", response);
    }
  }

  return h`<div>
    <h2>Lag ${name? `${name} sin`: `din`} Krets-side!</h2>
    <input type="text" value=${name} onInput=${updateName}/>
    <button disabled=${!name} onClick=${postBrand}>${name? `Opprett ${name}`: "Opprett siden"}</button>
  </div>`
}

/**
 * Viewing and creating brands
 * Visible on the front page if 
 * the user is logged in. 
 */
const BrandSection = () => {

  const { user } = useContext(AuthContext);

  return user? 
    h`<div>
      <${BrandCreator}/>
      <${BrandList}/>
    </div>`: null

}

const Home = (props) => {

  return h`<${Layout} auth0=${props}>
      
      <${BrandSection}/>
  </${Layout}>`
}


export default Home;
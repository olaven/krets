import { h, useState, useEffect } from "../deps_frontend.js"
import { http } from "../utils/http.js"

import Layout from './layout.js'


const useBrand = (url_name) => {

    const [ brand, setBrand ] = useState({ url_name: "loading..." }); 

    const getBrand = async () => {

        const response = await http.get(`/api/brands/${url_name}`);
        if (response.status === 200) {

            const brand = await response.json();
            setBrand(brand);
        } else {

            setBrand(null);
        }
    }

    useEffect(() => {

        getBrand();
    }, []); 

    return brand; 
}

const Brand = (props) => {
    
    const { url_name } = props
    const brand = useBrand(url_name);

    console.log("props", props);
    
    if (!brand) return h`<${Layout} auth0=${props.auth0}>
        <h1>Auda!</h1>
        <p>Denne Krets-siden finnes ikke...</p>
        <p>Kanskje du skal <a href="/">lage den?</a></p>
    </${Layout}}`

    return h `<${Layout} auth0=${props.auth0}>
        <h1>${brand.name} sin Krets-side!</h1>
    </${Layout}>`
}

export default Brand
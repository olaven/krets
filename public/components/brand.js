import { h, useState, useEffect } from "../deps_frontend.js"
import { get } from "../utils.js"

import Layout from './layout.js'


const useBrand = (name) => {

    const [ brand, setBrand ] = useState({ name: "loading..." }); 

    const getBrand = async () => {

        const response = await get(`/api/brands/${name}`);
        if (response.status === 200) {

            const brand = await response.json();
            console.log("awaited thing", brand)
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
    
    const { name } = props
    const brand = useBrand(name);
    
    if (!brand) return h`<${Layout}>
        <h1>Auda!</h1>
        <p>Denne Krets-siden finnes ikke...</p>
        <p>Kanskje du skal <a href="/">lage den?</a></p>
    </${Layout}}`

    return h `<${Layout}>
        <h1>${brand.name} sin Krets-side!</h1>
    </${Layout}>`
}

export default Brand
import { h } from "../deps_frontend.js"
import { get } from "../utils.js"
import { useState, useEffect } from "../hooks.js"


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

    return h `
        <div style=${{color: "red"}}>Brand name: ${brand.name}</div>
    `
}

export default Brand
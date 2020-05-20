import { h, useState, useEffect } from "../deps_frontend.js"
import { http } from "../utils/http.js"

import Outline from './outline.js'


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

const BrandPresentation = props => {

    return h`<div>present brand here</div>`
}

const ResponseSection = props => {

    return h`<div>give response</div>`
}

const BrandNotFound = () => h`<div>
    <h1>Auda!</h1>
    <p>Denne Krets-siden finnes ikke...</p>
    <p>Kanskje du skal <a href="/">lage den?</a></p>
</div>`

const Brand = (props) => {
    
    const { url_name } = props
    const brand = useBrand(url_name);

    return h `<${Outline} auth0=${props.auth0}>
        ${brand?
            h`<div>
                <${BrandPresentation}/>
                <${ResponseSection}/>
            </div>`: 
            h`<${BrandNotFound}/>`
        }
    </${Outline}>`;
}

export default Brand
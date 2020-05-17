import { h, useState, useEffect } from "../deps_frontend.js"
import { http } from "../utils/http.js"

import Layout from './layout.js'


const useBrand = (url_name) => {

    const [ brand, setBrand ] = useState({ url_name: "loading..." }); 

    const getBrand = async () => {

        const response = await http.get(`/api/brands/${url_name}`);
        console.log(response);
        if (response.status === 200) {

            const brand = await response.json();
            setBrand(brand);
        } else {

            setBrand(null);
        }
    }

    useEffect(getBrand, []); 

    return brand; 
}

const BrandPresentation = ({ brand }) => h`<div>
    <h1>${brand.name}</h1>
    <p>Gi tilbakemelding til ${brand.name}!</p>
</div>`

const ResponseSection = ({ brand }) => {

    const [ indicator, set_indicator ] = useState(null); 
    const [ comment, set_comment ] = useState("");

    const postResponse = async () => {

        const response = { indicator, comment }; 
        const post_response = await http.post(`/api/brands/${brand.url_name}/responses`, response); 

        if (post_response.status === 201) {

            alert("Supert! Tilbakemeldingen er sendt.");
            set_indicator(null);
            set_comment("")
        } else {

            alert("Det skjedde en feil.."); 
            console.error("Feilen: ", post_response);
        }
    }

    //NOTE: placeholder while I figure out emoji licensing
    const EmojiButton = props => h`
        <button 
            style=${{backgroundColor: indicator === props.indicator? 'yellow': null}} 
            onClick=${() => {set_indicator(props.indicator)}}>${props.icon}
        </button>
    `

    return h `<div> 
        <${EmojiButton} indicator=${'smile'} icon=${':-)'}/>
        <${EmojiButton} indicator=${'neutral'} icon=${':-|'}/>
        <${EmojiButton} indicator=${'sad'} icon=${':-('}/>
        <br></br>
        <textarea rows="4" cols="50" placeholder="Valgfri melding" onChange=${(event) => { set_comment(event.target.value) }}></textarea>
        <br></br>
        <button disabled=${!indicator} style=${{backgroundColor: "green", color: "white"}} onClick=${postResponse}>SEND</button>
    </div>`
}

const BrandNotFound = () => h`<div>
    <h1>Auda!</h1>
    <p>Denne Krets-siden finnes ikke...</p>
    <p>Kanskje du skal <a href="/">lage den?</a></p>
</div>`

const Brand = (props) => {
    
    const { url_name } = props
    const brand = useBrand(url_name);

    const style = {
        margin: "auto",
        width: "50%",
        textAlign: "center"
    }

    return h `<${Layout} auth0=${props.auth0}>
        ${brand?
            h `<div style=${style}>
                <${BrandPresentation} brand=${brand}/>
                <${ResponseSection} brand=${brand}/>
            </div>`: h`<${BrandNotFound}/>`
        }
    </${Layout}>`;
}

export default Brand
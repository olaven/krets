import htm from "https://unpkg.com/htm@2.2.1/dist/htm.module.js";
import {h,hydrate,} from "https://unpkg.com/preact@10.0.5/dist/preact.module.js";

const html = htm.bind(h);

export const client_render = (Component) => 
    hydrate(html`<${Component} page="All" />`, document.body);
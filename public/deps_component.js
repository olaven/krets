import htm from "https://unpkg.com/htm@3.0.3/dist/htm.module.js";
import { h as preact } from "https://unpkg.com/preact@10.0.5/dist/preact.module.js";

export const  h = htm.bind(preact);
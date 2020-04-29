import { h as preact } from 'https://cdn.pika.dev/preact@latest';
import htm from "https://cdn.pika.dev/htm";
//export { useState } from 'https://cdn.pika.dev/preact/hooks';

/* import htm from "https://cdn.pika.dev/htm";
import { _h as preact } from './preact.js'*/
export { useState, useEffect } from './hooks.js' 


export { renderToString } from "https://cdn.pika.dev/preact-render-to-string@5.1.6";

export const  h = htm.bind(preact);
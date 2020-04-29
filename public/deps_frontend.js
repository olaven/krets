import { h as preact } from 'https://cdn.pika.dev/preact@latest';
export { renderToString } from "https://cdn.pika.dev/preact-render-to-string";
export { useState, useEffect } from './hooks.js' 
import htm from "https://cdn.pika.dev/htm";

export const  h = htm.bind(preact);
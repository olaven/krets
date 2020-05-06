/**
 * Dependencies have to be available in `public` directory in 
 * order to be accessible from frontend 
 */
import { h as preact, createContext as cc } from 'https://cdn.pika.dev/preact';
export { renderToString } from 'https://cdn.pika.dev/preact-render-to-string@^5.0.6';
//export { renderToString } from "https://cdn.pika.dev/preact-render-to-string";
export { useState, useEffect, useContext } from './hooks.js' 
import htm from "https://cdn.pika.dev/htm";

export const createContext = cc;
export const  h = htm.bind(preact);
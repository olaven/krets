/**
 * Dependencies have to be available in `public` directory in 
 * order to be accessible from frontend 
 */

/* export { renderToString } from 'https://cdn.pika.dev/preact-render-to-string@^5.1.7';
export { useState, useEffect, useContext } from './hooks.js' //"https://cdn.pika.dev/preact/hooks"
import htm from "https://cdn.pika.dev/htm";
import { h as preact, createContext as cc } from 'https://cdn.pika.dev/preact';

export const createContext = cc;
export const h = htm.bind(preact); */

export { h, createContext } from 'https://cdn.pika.dev/preact';
export { useReducer, useEffect, useState, useContext } from 'https://cdn.pika.dev/preact/hooks';
export { renderToString } from 'https://cdn.pika.dev/preact-render-to-string@^5.1.4';
/* 
export {
    h,
    renderToString,
    useEffect, 
    useContext, 
    useState, 
    createContext
} from 'https://npm.reversehttp.com/preact,preact/hooks,preact-render-to-string'; */


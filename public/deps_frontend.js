import htm from "https://unpkg.com/htm@3.0.3/dist/htm.module.js";
import { h as preact } from "https://unpkg.com/preact@10.0.5/dist/preact.module.js";

export { useState, useEffect } from 'https://unpkg.com/preact@10.0.5/hooks/dist/hooks.module.js?module';
export const  h = htm.bind(preact);
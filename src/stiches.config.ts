// stitches.config.ts
import { createStyled } from '@stitches/react';

export const { styled, css } = createStyled({
    prefix: 'krets-css-class',
    tokens: {
        colors: {
            $primary: 'hsl(183, 80%, 20%)', //'#0A585C',
            $secondary: 'hsl(215, 90%, 96%)', //'#EBF3FE',
            $dark: 'black',
            $attention: '#F99C39',
        },
        space: {
            $1: '1px',
            $2: '2px',
            $3: '3px',
            $5: '5px',
            $8: '8px',
            $13: '13px',
            $21: '21px',
            $34: '34px',
            $55: '55px',
            $79: '79px',
            $114: '114px',
        },
        fontSizes: {
            $21: '21px',
            $34: '34px',
            $55: '55px',
            $79: '79px',
            $114: '114px',
        }
    },
    breakpoints: {
        small: (rule) => `@media (max-width: 768px) { ${rule} }`,
        large: rule => `@media (min-width: 768px) { ${rule} }`
    },
    utils: {},
})
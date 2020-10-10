// stitches.config.ts
import { createStyled } from '@stitches/react';

export const { styled, css } = createStyled({
    prefix: 'krets-css-class',
    tokens: {
        colors: {
            $primary: 'hsl(183, 80%, 20%)', //'#0A585C',
            $secondary: 'hsl(215, 90%, 96%)', //'#EBF3FE',
        },
    },
    breakpoints: {
        small: (rule) => `@media (max-width: 768px) { ${rule} }`,
        large: rule => `@media (min-width: 768px) { ${rule} }`
    },
    utils: {},
})
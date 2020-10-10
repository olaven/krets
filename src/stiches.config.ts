// stitches.config.ts
import { createStyled } from '@stitches/react';

export const { styled, css } = createStyled({
    prefix: 'krets-css-class',
    tokens: {},
    breakpoints: {
        small: (rule) => `@media (max-width: 768px) { ${rule} }`,
        large: rule => `@media (min-width: 768px) { ${rule} }`
    },
    utils: {},
})
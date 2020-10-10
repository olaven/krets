//NOTE: over time, planned to replace this with `stiches.config.ts`
export const KretsTheme = {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [
        12, 14, 16, 20, 24, 32, 48, 64
    ],
    fonts: {

        body: 'Open Sans, sans-serif',
        heading: 'inherit',
        monospace: 'inherit',
    },
    colors: {
        secondary: "#EBF3FE", //old FDFEFC
        primary: "#0A585C", //old: 'teal',
        success: '#048243',
        failure: '#D5174E',
        attention: 'orange',
        inactive: "#97d1d1"
    },
    space: [
        4, 8, 16, 32, 64, 128, 256
    ],

    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    shadows: {
        small: '0 0 4px rgba(0, 0, 0, .125)',
        large: '0 0 24px rgba(0, 0, 0, .125)'
    },
    variants: {

    },
    text: {

    },
    radii: {
        default: 15,
    }
};

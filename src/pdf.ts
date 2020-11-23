import { jsPDF } from "jspdf";

const sizes = {

    heading: 55,
    text: 21,
};

/**
 * Minimal wrapper around jsPDF, adding methods 
 * with predefined Krets settings 
 * @param _pdf 
 */
export const pdf = (_pdf = new jsPDF()) => ({

    withHeadingSize: () => {
        _pdf.setFontSize(sizes.heading);
        return pdf(_pdf);
    },
    withTextSize: () => {
        _pdf.setFontSize(sizes.text);
        return pdf(_pdf);
    },
    writeAt: {
        top: (text: string) => {
            _pdf.text(text, 21, 21);
            return pdf(_pdf);
        },
        middle: (text: string) => {
            _pdf.text(text, 21, 114);
            return pdf(_pdf);
        },
        bottom: (text: string) => {
            _pdf.text(text, 21, 223);
            return pdf(_pdf);
        },
    },
    ..._pdf
});

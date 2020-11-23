import { jsPDF } from "jspdf";

const sizes = {

    heading: 55,
    text: 21,
};

/**
 * Minimal wrapper around jsPDF, adding methods 
 * with predefined Krets settings. 
 * 
 * Based on A4 dimmensions,  210×297 
 * @param _pdf 
 */
export const pdf = (_pdf = new jsPDF()) => ({

    writeHeader: (text: string) => pdf(
        _pdf
            .setFont("helvetica", "normal")
            .setFontSize(sizes.heading)
            .text(text, 21, 21)
    ),

    writeSubheader: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.text)
            .text(text, 21, 55)
    ),

    writeParagraph: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.text)
            .text(text, 21, 114)
    ),

    setQR: (image = "QR-placeholder") => pdf(
        _pdf
            .text(image, 105, 200)
    ),
    /* writeAt: {
        top: (text: string) => {
            _pdf.text(text, 21, 21);
            return pdf(_pdf);
        },
        middle: (text: string) => {
            _pdf.text(text, 21, 114);
            return pdf(_pdf);
        },
        bottom: (text: string) => {
            _pdf.text(text, 21, 250);
            return pdf(_pdf);
        },
    }, */
    save: (filename = "generated.pdf") => {

        _pdf.save(filename);
        return pdf(_pdf);
    }
});

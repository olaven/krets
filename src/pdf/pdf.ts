import { jsPDF } from "jspdf";
import "./Roboto-Light-normal";


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
export const pdf = (_pdf = new jsPDF().setFont("Roboto-Light")) => ({

    font: () => {
        console.log(_pdf.getFont());
        return pdf(_pdf);
    },
    writeHeader: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.heading)
            .text(text, 21, 21)
    ),

    writeSubheader: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.text)
            .text(text, 21, 55)
    ),

    writeEmoji: () => pdf(
        _pdf.addImage("/smiley.png", "PNG", 15, 40, 180, 180)
    ),
    /**
     * //NOTE: see Download.tsx for inspiration
     * @param image dataURL
     */
    writeQR: (dataURL: string) => {


    },
    writeParagraph: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.text)
            .text(text, 21, 114)
    ),

    setQR: (image = "QR-placeholder") => pdf(
        _pdf
            .text(image, 105, 200)
    ),
    save: (filename = "generated.pdf") => {

        _pdf.save(filename);
        return pdf(_pdf);
    },
    output: (type: "pdfjsnewwindow" | "dataurlnewwindow") => {
        _pdf.output(type)
        return pdf(_pdf);
    }
});

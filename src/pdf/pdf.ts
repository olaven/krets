import { jsPDF } from "jspdf";
import "./Roboto-Light-normal";

const colors = {
    primary: "#0A585C"
}

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
            .text(text, 21, 80)
    ),

    writeEmoji: () => pdf(
        _pdf.addImage("/smiley.png", "PNG", 140, 55, 65, 65)
    ),
    writeParagraph: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.text)
            .text(text, 21, 114)
    ),
    /**
     * //NOTE: see Download.tsx for inspiration
     * @param dataURL
     */
    setQR: (dataURL) => pdf(
        _pdf
            .text("QR PLACEHOLDER", 105, 200)
            .setFillColor(colors.primary)
            .setDrawColor(colors.primary)
            .roundedRect(105, 200, 200, 200, 5, 5, "F")
    ),
    writeKretsPromo: () => pdf(
        _pdf
            //986 × 352 - promo dimensions
            .addImage("/promo.png", "PNG", 2, (297 - (352 / 25) - 1), 986 / 25, 352 / 25)
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

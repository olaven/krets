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
            .text(text, 12, 34)
    ),

    writeSubheader: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.text)
            .text(text, 12, 80)
    ),

    writeEmoji: () => pdf(
        _pdf.addImage("/smiley.png", "PNG", 140, 55, 65, 65)
    ),
    writeParagraph: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.text)
            .text(text, 12, 114, {
                maxWidth: 130
            })
    ),
    /**
     * //NOTE: see Download.tsx for inspiration
     * @param dataURL
     */
    setQR: (dataURL) => {

        const size = 100;
        const margin = size * 0.04;

        const x = 50;
        const y = 150;

        return pdf(
            _pdf
                .setFillColor(colors.primary)
                .setDrawColor(colors.primary)
                .roundedRect(x, y, size, size, 5, 5, "F")
                .addImage(dataURL, "PNG", (x + margin), (y + margin), (size - (margin * 2)), (size - (margin * 2)))
        )
    },
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

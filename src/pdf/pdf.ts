import { jsPDF } from "jspdf";
import "./Roboto-Light-normal";

export const openKretsPDF = (options: {
    filename: string,
    header: string,
    subheader: string,
    paragraph: string,
    QRDataURL: string,
}) =>
    pdf()
        .writeHeader(options.header)
        .writeSubheader(options.subheader)
        .writeParagraph(options.paragraph)
        .setQR(options.QRDataURL)
        .writeKretsPromo()
        .writeEmoji()
        .save(options.filename)

/**
 * Minimal wrapper around jsPDF, adding methods 
 * with predefined Krets settings. 
 * 
 * Based on A4 dimmensions,  210×297 
 * @param _pdf 
 */
const pdf = (
    _pdf = new jsPDF()/* .setFont("Roboto-Light") */,
    sizes = {
        heading: 34,
        text: 21,
    },
    colors = {
        primary: "#0A585C"
    }
) => ({

    writeHeader: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.heading)
            .text(text, 12, 34, {
                maxWidth: 190
            })
    ),

    writeSubheader: (text: string) => pdf(
        _pdf
            .setFontSize(sizes.text)
            .text(text, 12, 80, {
                maxWidth: 140
            })
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

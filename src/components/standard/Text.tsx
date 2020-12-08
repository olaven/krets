import { styled } from "../../stiches.config";


export const Paragraph = styled("p", {

    paddingLeft: "$8",
    fontSize: "$21",
    small: {
        fontSize: "$13",
    },

    variants: {
        ligth: {
            true: {
                fontWeight: "lighter"
            }
        }
    }

});

export const Label = styled("label", {

    fontSize: "$21",
    paddingTop: "$13",
});
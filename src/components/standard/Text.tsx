import { styled } from "../../stiches.config";

const commonTextStyles = {
    fontSize: "$21",
    small: {
        fontSize: "$13",
    },
}

export const Paragraph = styled("p", {

    paddingLeft: "$8",

    ...commonTextStyles,
});

export const Label = styled("label", {

    paddingTop: "$21",
    ...commonTextStyles,
});
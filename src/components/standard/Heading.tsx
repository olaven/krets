import { styled } from "../../stiches.config";

const headingStyles: any = {
    color: '$dark',
    fontWeight: "lighter",
    textAlign: "center",

    variants: {
        left: {
            true: {
                textAlign: "left"
            }
        }
    }
}

//FIXME: Type checker does not understand variants if inherited from destructured object. (thus the duplication here)
export const H1 = styled('h1', {
    color: '$dark',
    fontWeight: "lighter",
    textAlign: "center",

    variants: {
        left: {
            true: {
                textAlign: "left"
            }
        }
    }
});

export const H2 = styled('h2', {
    ...headingStyles
});

export const H3 = styled('h2', {
    ...headingStyles
});


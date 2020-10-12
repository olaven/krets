import { styled } from "../../stiches.config";

export const Checkbox = () => {

    const Input = styled("input", {
        transform: "scale(300%)",
        backgroundColor: "$secondary",
        color: "$primary",
        opacity: 0,

        "&:checked + label": {
            backgroundColor: "$primary",
            color: "$secondary",

            svg: {
                stroke: "$secondary",
                fontSize: "3em",
            }
        }
    });

    const Label = styled('label', {
        borderColor: "$primary",
        backgroundColor: "$secondary",
        borderStyle: "solid",

        position: "absolute",
        width: "50px",
        height: "50px",

        cursor: "pointer",
        ":hover": {
            transitionDuration: "100ms",
            transitionTimingFunction: "linear",
            transform: "scale(1.1)"
        },

        svg: {
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-out",
            stroke: "$primary",

            ":hover": {
                transitionDuration: "20ms",
                transitionTimingFunction: "ease-in-out",
                transform: "scale(1.05)"
            }
        }
    });

    return <>
        <Input type="checkbox" id="checkbox" />
        <Label for="checkbox">
            <svg
                viewBox="0 -2 24 24"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </Label>
    </>
}

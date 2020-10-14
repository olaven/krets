import { styled } from "../../stiches.config";

export const Checkbox = ({ checked, onChange }) => {

    const Container = styled('div', {
        position: "relative",
        display: "inline",
        textAlign: "center",
        paddingLeft: "$34",
        paddingRight: "$34",
    });

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
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "50%",

        position: "absolute",
        width: "3em",
        height: "3em",
        verticalAlign: "center",
        transform: "translateX(-50%) translateY(-25%)",

        cursor: "pointer",
        ":hover": {
            transitionDuration: "100ms",
            transitionTimingFunction: "linear",
            transform: "scale(1.1) translateX(-50%) translateY(-25%)",
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

    return <Container>
        <Input onChange={onChange} checked={checked} type="checkbox" id="checkbox" />
        <Label htmlFor="checkbox">
            <svg
                viewBox="0 -2 24 24"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </Label>
    </Container >
}

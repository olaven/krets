import { styled } from "../../stiches.config";

export const Checkbox = ({ checked, onChange }) => {

    const Container = styled('div', {
        display: "flex",
        //position: "relative",
        //display: "inline",
        //textAlign: "center",
        //margin: "$21",
    });

    const Input = styled("input", {
        opacity: 1,

        verticalAlign: "middle",

        "&:checked + label": {
            backgroundColor: "$primary",
            color: "$secondary",

            span: {

                svg: {
                    stroke: "$secondary",
                    fontSize: "3em",
                }
            }
        }
    });

    const Label = styled('label', {
        borderColor: "$primary",
        backgroundColor: "$secondary",
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "50%",

        display: "inline-block",

        /*         position: "absolute",
                width: "4em",
                height: "4em",
                transform: "translateX(-50%) translateY(10%)",
                transformOrigin: "center", */
        width: "4em",
        height: "4em",

        cursor: "pointer",
        ":hover": {
            transitionDuration: "100ms",
            transitionTimingFunction: "linear",
            transform: "scale(1.2) translateX(-50%) translateY(10%)",
        },

        span: {

            verticalAlign: "middle",
            svg: {
                stroke: "$primary",

                ":hover": {
                    transitionDuration: "20ms",
                    transitionTimingFunction: "ease-in-out",
                    transform: "scale(1.05)"
                }
            }
        }
    });

    return <Container>
        <Label htmlFor="checkbox">
            <Input onChange={onChange} checked={checked} type="checkbox" id="checkbox" />
            <span>

                <svg
                    viewBox="0 6 24 24 "
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </span>
        </Label>
    </Container >
}

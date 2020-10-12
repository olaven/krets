import { styled } from "../../stiches.config";

export const Button = styled('button', {
    border: "none",
    color: "$secondary",
    backgroundColor: "$primary",
    cursor: "pointer",
    padding: "$8",
    borderRadius: "5px",
    fontSize: "$21",

    ":hover": {
        transitionDuration: "50ms",
        backgroundColor: "$secondary",
        color: "$primary",
        underlineColor: "$primary",
        textDecoration: "underline",
        borderWidth: "1px",
        borderColor: "$black",
    },


    variants: {
        shape: {
            circular: {
                display: "block",
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                padding: "0px",
                textAlign: "center",
            }
        },
        width: {
            full: {

                large: {
                    width: "80%",
                },
                small: {
                    width: "100%"
                }
            }
        }
    }
});
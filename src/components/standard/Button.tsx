import { styled } from "../../stiches.config";

export const Button = styled('button', {
    border: "none",
    color: "$secondary",
    backgroundColor: "$primary",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "$21",
    padding: "$8 $13",
    margin: "$3",

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

        inverted: {

            true: {
                backgroundColor: "$secondary",
                color: "$primary",
                border: "solid $primary",
                borderWidth: "$3",

                ":hover": {
                    borderWidth: "$5",
                    color: "$secondary",
                    backgroundColor: "$primary",
                    textDecoration: "none"
                }
            }
        },

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
                    //width: "100%"
                }
            }
        }
    }
});


export const ArrowButton = (props) => <Button
    shape="circular"
    {...props}
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 -4 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
</Button>
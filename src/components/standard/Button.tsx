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
                height: "79px",
                width: "79px",
                borderRadius: "50%",
                padding: "0px",
                textAlign: "center",
            }
        },

        width: {
            full: {

                width: "100%",
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
        width="48"
        height="48"
        viewBox="0 -4 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round">
        <line x1="10" y1="24" x2="38" y2="24"></line>
        <polyline points="24 10 38 24 24 38"></polyline>
    </svg>
</Button>
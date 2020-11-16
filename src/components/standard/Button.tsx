import { styled } from "../../stiches.config";

export const Button = styled('button', {
    border: "none",
    color: "$secondary",
    backgroundColor: "$primary",
    cursor: "pointer",
    fontSize: "$21",
    padding: "$8 $13",
    margin: "$3",

    borderRadius: "5px",
    borderWidth: "1px",

    ":hover": {
        transitionDuration: "55ms",
        backgroundColor: "$secondary",
        color: "$primary",
        textDecoration: "underline",

        borderColor: "$black",
    },


    variants: {

        inverted: {

            true: {
                backgroundColor: "$secondary",
                color: "$primary",
                border: "solid $primary",
                borderWidth: "$1",

                ":hover": {
                    color: "$secondary",
                    backgroundColor: "$primary",
                    textDecoration: "none"
                }
            }

        },

        disabled: {

            true: {

                backgroundColor: "grey",
                color: "white",
            }
        },

        danger: {

            true: {

                backgroundColor: "$danger",
                ":hover": {
                    color: "$danger",
                }
            }
        },

        circular: {

            true: {
                display: "block",
                height: "79%",
                width: "79%",
                borderRadius: "50%",
                padding: "0px",
                textAlign: "center",
            },
        },

        width: {
            full: {

                width: "100%",
            }
        }
    }
});


type ArrowProps = { direction?: "left" | "right" | "up" | "down", size: number, onClick?: any, circular?: boolean, inverted?: boolean }
export const ArrowButton = (props: ArrowProps) => {

    const rotation = {
        right: "0",
        left: "180",
        up: "270",
        down: "90",
    }[props.direction]

    const goldenRatio = 1.61803398875
    const svgSize = props.size / goldenRatio

    const poly = [18, 5, 24, 14, 18, 24]
        .map(point => props.size * (point / 48))
        .join(" ");

    const line = {
        x1: props.size * (1 / 48),
        y1: props.size * (14 / 48),
        x2: props.size * (20 / 48),
        y2: props.size * (14 / 48),
    };


    return <Button
        {...props}
        style={{
            transform: `rotate(${rotation}deg)`,
            width: `${(props.size)}px`,
            height: `${(props.size)}px`
        }}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize}
            height={svgSize}
            viewBox={`0 -4 ${svgSize} ${svgSize}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}></line>
            <polyline points={poly}></polyline>
        </svg>
    </Button>
}
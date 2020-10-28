import { styled } from "../../stiches.config";
import { useToggle } from "../../effects/useToggle";

export const Checkbox = ({ checked, onChange }) => {


    const [selected, toggle] = useToggle(false);

    const Container = styled('div', {
        display: "flex",
    });

    const Input = styled("input", {
        opacity: 0,

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

        width: "4em",
        height: "4em",
        cursor: "pointer",

        span: {
            svg: {
                stroke: "$primary",
            }
        },

        variants: {
            selected: {
                true: {
                    backgroundColor: "$primary",
                    color: "$secondary",
                    span: {
                        svg: {
                            stroke: "$secondary",
                        }
                    }
                },
            },
        },
    });

    return <Container>
        <Label htmlFor="checkbox" selected={selected}>
            <Input onChange={(event) => {

                toggle();
                onChange(event);
            }} checked={checked} type="checkbox" id="checkbox" />
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

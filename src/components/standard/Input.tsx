import { styled } from "../../stiches.config";



const Input = styled("input", {
    padding: "$5",
    margin: "$5 0",
    borderRadius: "5px",
    border: "2px solid #c6c6c6",
    fontSize: "$21",
    ":focus": {
        outline: "none"
    }
});

export const TextInput = (props) =>
    <Input {...props} type="text" />
export const NumberInput = (props) =>
    <Input {...props} type="number" />
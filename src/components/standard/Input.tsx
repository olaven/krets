import { styled } from "../../stiches.config";



const Input = styled("input", {
    padding: "$5",
    margin: "$8 0",
    borderRadius: "5px",
    border: "2px solid #c6c6c6",
    backgroundColor: "$secondary",
    color: "$black",
    fontSize: "$21",
    ":focus": {
        outline: "none"
    }
});

export const TextArea = styled("textarea", {
    padding: "$5",
    margin: "$8 0",
    borderRadius: "5px",
    border: "2px solid #c6c6c6",
    backgroundColor: "$secondary",
    color: "$black",
    fontSize: "$21",
    ":focus": {
        outline: "none"
    }
})

export const TextInput = (props) =>
    <Input  {...props} type="text" />
export const NumberInput = (props) =>
    <Input {...props} type="number" />


//TODO: find better home 
export const QuestionInput = styled(TextInput, {
    width: "79ch"
});
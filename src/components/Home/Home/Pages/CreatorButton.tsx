import { Button } from "../../../standard/Button";
import { styled } from "../../../../stiches.config";


export const CreatorButton = styled(Button, {
    borderRadius: "15px",
    margin: "$21",
    padding: "$21",
    alignSelf: "center",
    opacity: 0.7, 
    ":hover": {
        opacity: 1
    }
});

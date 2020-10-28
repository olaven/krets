import * as uiText from "../../../text";
import { styled } from "../../../stiches.config";
import { Paragraph } from "../../standard/Text";
import { Button } from "../../standard/Button";

const OuterContainer = styled("div", {
    display: "flex",
    flexDirection: "column"
})

const ButtonContainer = styled("div", {
    display: "flex",
    justifyItems: "center",
    justifyContent: "space-evenly"
});

//FIXME: perhaps reuse? Just a generalized copy of the code in ./ContactInput now
export const Choice = ({ text, onYes, onNo }) => <OuterContainer>
    <Paragraph>{text}</Paragraph>
    <ButtonContainer>
        <Button inverted onClick={onYes}>
            {uiText.response.contact.yes}
        </Button>
        <Button inverted onClick={onNo}>
            {uiText.response.contact.no}
        </Button>
    </ButtonContainer>
</OuterContainer >;

import { emojidata } from "../../helpers/emojidata";
import { styled } from "../../stiches.config";
import * as text from "../../helpers/text";
import { H1 } from "./Heading";

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
});

const ThanksHeading = styled(H1, {
    fontSize: "$114",

    small: {
        fontSize: "$55"
    }
});

const EmojiWrapper = styled("div", {
    fontSize: "$223",
    textAlign: "center",
    marginTop: "-$114",

    small: {
        fontSize: "$114",
        marginTop: "0",
    }
})

export const Thanks = () => <Container>
    <ThanksHeading>{text.response.thanks}</ThanksHeading>
    <EmojiWrapper>{emojidata["tada"]}</EmojiWrapper>
</Container>
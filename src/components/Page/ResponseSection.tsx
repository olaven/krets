import Emoji from "react-emoji-render";
import { Box, Button, Flex, Heading } from "rebass"
import { Input } from '@rebass/forms'
import React, { useState } from "react";
import { KretsEmoji } from "../tiny/emoji";
import { CREATED } from "../../http/codes";
import { Emotion } from "../../models";
import * as uiText from "../../text";
import { postResponse } from "../../http/fetchers";

export const ResponseSection = ({ page }) => {

    const [emotion, setEmotion] = useState<Emotion>(null);
    const [text, setText] = useState("");
    const [published, setPublished] = useState(false);


    const submitResponse = async () => {

        if (!emotion) {

            alert(uiText.response.chooseSmiley);
            return;
        }

        const [status] = await postResponse({
            emotion, text, page_id: page.id
        });


        if (status === CREATED) {

            setPublished(true);
        } else {

            alert(uiText.response.error);
        }
    };

    const form = published ?
        <Heading p={[2, 3, 4]} fontSize={[5, 6, 7]} backgroundColor="success" color="secondary">{uiText.response.thanks}<Emoji text=":tada:" /></Heading> :
        <>
            <Heading py={[1, 2, 3]} color={"primary"}>{uiText.response.header} {page.name}</Heading>
            <Flex>
                <KretsEmoji type={":-)"} emotion={emotion} setEmotion={setEmotion} />
                <KretsEmoji type={":-|"} emotion={emotion} setEmotion={setEmotion} />
                <KretsEmoji type={":-("} emotion={emotion} setEmotion={setEmotion} />
            </Flex>
            <Flex p={[1, 2, 3]}>
                <Input
                    placeholder={uiText.response.placeholder}
                    onChange={event => { setText(event.target.value) }}
                />
                <Button m={1} px={3} onClick={submitResponse}>{uiText.response.button}</Button>
            </Flex>
        </>

    return <Box m={"auto"} py={[4, 8, 16]}>
        {form}
    </Box>;
};
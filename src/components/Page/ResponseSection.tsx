import Emoji from "react-emoji-render";
import { Box, Button, Flex, Heading } from "rebass"
import { Input } from '@rebass/forms'
import React, { useState } from "react";
import { KretsEmoji } from "../tiny/emoji";
import { get, post } from "../../http/methods";
import { CREATED } from "../../http/codes";
import { ReseponseModel, Emotion } from "../../models";
import { response } from "../../text";

export const ResponseSection = ({ page }) => {

    const [emotion, setEmotion] = useState<Emotion>(null);
    const [text, setText] = useState("");
    const [published, setPublished] = useState(false);


    const postResponse = async () => {

        if (!emotion) {

            alert(response.chooseSmiley);
            return;
        }

        const [status] = await post(`/api/pages/${page.id}/responses`, {
            emotion, text, page_id: page.id
        } as ReseponseModel);


        if (status === CREATED) {

            setPublished(true);
        } else {

            alert(response.error);
            console.warn(postResponse);
        }
    };

    const form = published ?
        <Heading p={[2, 3, 4]} fontSize={[5, 6, 7]} backgroundColor="success" color="secondary">Tusen takk! <Emoji text=":tada:" /></Heading> :
        <>
            <Heading py={[1, 2, 3]} color={"primary"}>{response.header} {page.name}</Heading>
            <Flex>
                <KretsEmoji type={":-)"} emotion={emotion} setEmotion={setEmotion} />
                <KretsEmoji type={":-|"} emotion={emotion} setEmotion={setEmotion} />
                <KretsEmoji type={":-("} emotion={emotion} setEmotion={setEmotion} />
            </Flex>
            <Flex p={[1, 2, 3]}>
                <Input
                    placeholder={response.placeholder}
                    onChange={event => { setText(event.target.value) }}
                />
                <Button m={1} px={3} onClick={postResponse}>{response.button}</Button>
            </Flex>
        </>

    return <Box m={"auto"} py={[4, 8, 16]}>
        {form}
    </Box>;
};
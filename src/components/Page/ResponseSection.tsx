import Emoji from "react-emoji-render";
import { Box, Button, Flex, Heading } from "rebass"
import { Input } from '@rebass/forms'
import React, { useState } from "react";
import { KretsEmoji } from "../tiny/emoji";
import { get, post } from "../../http/methods";
import { CREATED } from "../../http/codes";
import { ReseponseModel, Emotion } from "../../models";


export const ResponseSection = ({ page }) => {

    const [emotion, setEmotion] = useState<Emotion>(null);
    const [text, setText] = useState("");
    const [published, setPublished] = useState(false);


    const postResponse = async () => {

        if (!emotion) {

            alert("Velg en smiley!");
            return;
        }

        const [status] = await post(`/api/pages/${page.id}/responses`, {
            emotion, text, page_id: page.id
        } as ReseponseModel);


        if (status === CREATED) {

            setPublished(true);
        } else {

            alert("Auda, her skjedde det noe uventet..");
            console.warn(postResponse);
        }
    };

    const form = published ?
        <Heading p={[2, 3, 4]} fontSize={[5, 6, 7]} backgroundColor="success" color="secondary">Tusen takk! <Emoji text=":tada:" /></Heading> :
        <>
            <Heading py={[1, 2, 3]} color={"primary"}>Gi tilbakemelding til {page.name}</Heading>
            <Flex>
                <KretsEmoji type={":D"} emotion={emotion} setEmotion={setEmotion} />
                <KretsEmoji type={":|"} emotion={emotion} setEmotion={setEmotion} />
                <KretsEmoji type={":("} emotion={emotion} setEmotion={setEmotion} />
            </Flex>
            <Flex p={[1, 2, 3]}>
                <Input
                    placeholder='Valgfri tekst'
                    onChange={event => { setText(event.target.value) }}
                />
                <Button mx={3} onClick={postResponse}>Send</Button>
            </Flex>
        </>

    return <Box m={"auto"} py={[4, 8, 16]}>
        {form}
    </Box>;
};
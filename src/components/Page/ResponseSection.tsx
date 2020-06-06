import Emoji from "react-emoji-render";
import { Box, Button, Flex, Heading } from "rebass"
import { Input } from '@rebass/forms'
import React, { useState } from "react";
import { KretsEmoji } from "../tiny/emoji";


export const ResponseSection = props => {

    const { page } = props;
    const [emotion, setEmotion] = useState(null);
    const [text, setText] = useState("");
    const [published, setPublished] = useState(false);

    const postResponse = async () => {

        if (!emotion) {

            alert("Velg en smiley!");
            return;
        }

        const payload = {
            emotion, text
        };

        const postResponse = await fetch(`/api/pages/${page.id}/responses`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (postResponse.status === 201) {

            //TODO: replace input field with some thumbs-up/checkmark thing
            setPublished(true);
        } else {

            alert("Auda, her skjedde det noe uventet..");
            console.warn(postResponse);
        }
    };

    const form = published ?
        <Heading p={[2, 3, 4]} fontSize={[ 5, 6, 7 ]} backgroundColor="success" color="secondary">Tusen takk! <Emoji text=":tada:"/></Heading>: 
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
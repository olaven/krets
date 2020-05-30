import Emoji from "react-emoji-render";
import {Box, Button, Flex, Text} from "rebass"
import {Input} from '@rebass/forms'
import React, {useState} from "react";

export const KretsEmoji = props => {

    const {type, emotion, setEmotion} = props;

    const style = (emotion === type)?
        {

            fontSize: [32, 48, 64],
            boxShadow: "3px 3px",
        }: {
            fontSize: [24, 32, 48],
        };


    return <Box px={4} onClick={() => {setEmotion(type)}}>
        <Text
            {...style}>
            <Emoji text={type}/>
        </Text>
    </Box>

};


export const ResponseSection = props => {

    const { page } = props;
    const [ emotion, setEmotion ] = useState(null);
    const [ text, setText ] = useState("");

    const postResponse = async () => {

        if (!emotion) {

            alert("Velg en smiley!");
            return;
        }

        const payload = {
            emotion, text
        };

        const postResponse = await fetch(`/api/${page.id}/responses`, {
            method: "post",
            body: JSON.stringify(payload)
        });

        if (postResponse.status === 201) {

            //TODO: replace input field with some thumbs-up/checkmark thing
            alert("Publisert!");
        } else {

            alert("Auda, her skjedde det noe uventet..");
            console.warn(postResponse);
        }
    };

    return <Box m={"auto"} py={[4, 8, 16]}>

        <Flex>
            <KretsEmoji type={":D"} emotion={emotion} setEmotion={setEmotion}/>
            <KretsEmoji type={":|"} emotion={emotion} setEmotion={setEmotion}/>
            <KretsEmoji type={":("} emotion={emotion} setEmotion={setEmotion}/>
        </Flex>
        <Flex>
            <Input
                placeholder='Valgfri tekst'
                onChange={event => {setText(event.target.value)}}
            />
            <Button mx={3} onClick={postResponse}>Send</Button>
        </Flex>
    </Box>;
};
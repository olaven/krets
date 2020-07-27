import Emoji from "react-emoji-render";
import { Box, Button, Flex, Heading } from "rebass"
import { Input, Checkbox, Label } from '@rebass/forms'
import React, { useState } from "react";
import { KretsEmoji } from "../tiny/emoji";
import { CREATED } from "node-kall";
import { ResponseModel, Emotion } from "../../models";
import * as uiText from "../../text";
import { postResponse } from "../../fetchers";


const getPlaceholder = (emotion: Emotion) => ({
    ":-)": uiText.response.placeholder.happy,
    ":-|": uiText.response.placeholder.neutral,
    ":-(": uiText.response.placeholder.sad,
}[emotion])

const TextInput = ({ setText, onPostResponse, emotion }) => <Flex p={[1, 2, 3]}>
    <Input
        placeholder={getPlaceholder(emotion)}
        onChange={event => { setText(event.target.value) }}
    />
    <Button m={1} px={3} onClick={onPostResponse}>{uiText.response.button}</Button>
</Flex>

const ContactInput = ({ checked, setChecked, setContactDetails }) => <>
    <Label width={[]} p={2}>
        <Checkbox
            onChange={() => { setChecked(!checked) }}
            checked={checked}
        />
        {uiText.response.contactCheckbox}
    </Label>
    {checked &&
        <Input
            placeholder={uiText.response.contactPlaceholder}
            onChange={event => {
                setContactDetails(event.target.value
                    .trim()
                    .toLowerCase())
            }}
        />
    }
</>

export const ResponseSection = ({ page }) => {

    const [emotion, setEmotion] = useState<Emotion>(null);
    const [text, setText] = useState("");
    const [checked, setChecked] = useState(false);
    const [contactDetails, setContactDetails] = useState<>("");
    const [published, setPublished] = useState(false);

    console.log(contactDetails);


    const onPostResponse = async () => {

        if (!emotion) {

            alert(uiText.response.chooseSmiley);
            return;
        }

        const [status] = await postResponse({
            emotion,
            text,
            page_id: page.id,
            contact_details: contactDetails ? contactDetails : null
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
            {emotion && <>
                <TextInput
                    setText={setText}
                    onPostResponse={onPostResponse}
                    emotion={emotion} />
                <ContactInput
                    checked={checked}
                    setChecked={setChecked}
                    setContactDetails={setContactDetails} />
            </>}
        </>

    return <Box m={"auto"} py={[4, 8, 16]}>
        {form}
    </Box>;
};
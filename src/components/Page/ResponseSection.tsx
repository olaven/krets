import Emoji from "react-emoji-render";
import { Box, Button, Flex, Heading } from "rebass"
import { Input, Checkbox, Label } from '@rebass/forms'
import React, { useState } from "react";
import { KretsEmoji } from "../tiny/emoji";
import { CREATED } from "node-kall";
import { Emotion } from "../../models/models";
import * as uiText from "../../text";
import { postResponse } from "../../fetchers";
import { Thanks } from "../tiny/Thanks";


const getPlaceholder = (emotion: Emotion) => ({
    ":-)": uiText.response.placeholder.happy,
    ":-|": uiText.response.placeholder.neutral,
    ":-(": uiText.response.placeholder.sad,
}[emotion])

const TextInput = ({ setText, emotion }) => <Flex p={[1, 2, 3]}>
    <Input
        aria-label="response-text-input"
        placeholder={getPlaceholder(emotion)}
        onChange={event => { setText(event.target.value) }}
    />
</Flex>

const ContactInput = ({ checked, setChecked, setContactDetails }) => <Flex p={[1, 2]}>
    <Label width={[]} fontSize={[1]}>
        <Checkbox
            aria-label="response-checkbox-input"
            onChange={() => { setChecked(!checked) }}
            checked={checked}
        />
        {uiText.response.contactCheckbox}
    </Label>
    {checked &&
        <Input
            aria-label="response-contact-input"
            placeholder={uiText.response.contactPlaceholder}
            onChange={event => {
                setContactDetails(event.target.value
                    .trim()
                    .toLowerCase())
            }}
        />
    }
</Flex>


const ResponseSectionForm = ({ page, published, emotion, setEmotion, setText, checked, setChecked, setContactDetails, onPostResponse }) =>
    published ?
        <Thanks /> :
        <>
            <Heading textAlign={"center"} aria-label="response-section-header" py={[1, 2, 3]} color={"primary"}>{uiText.response.header} {page.name}</Heading>
            <Flex>
                <KretsEmoji type={":-)"} emotion={emotion} setEmotion={setEmotion} />
                <KretsEmoji type={":-|"} emotion={emotion} setEmotion={setEmotion} />
                <KretsEmoji type={":-("} emotion={emotion} setEmotion={setEmotion} />
            </Flex>
            {emotion && <>
                <TextInput
                    setText={setText}
                    emotion={emotion} />
                <ContactInput
                    checked={checked}
                    setChecked={setChecked}
                    setContactDetails={setContactDetails} />
                <Button
                    aria-label="response-button-input"
                    width={1}
                    m={1}
                    px={3}
                    onClick={onPostResponse}>
                    {uiText.response.button}
                </Button>
            </>}
        </>

export const ResponseSection = ({ page }) => {

    const [emotion, setEmotion] = useState<Emotion>(null);
    const [text, setText] = useState("");
    const [checked, setChecked] = useState(false);
    const [contactDetails, setContactDetails] = useState("");
    const [published, setPublished] = useState(false);


    const onPostResponse = async () => {

        //NOTE:impossible with current implementation, as button is hidden if no emotion is selected
        if (!emotion) {
            alert(uiText.response.chooseSmiley);
            return;
        }

        const [status, response] = await postResponse({
            emotion,
            //text,
            page_id: page.id,
            contact_details: contactDetails ? contactDetails : null
        });


        if (status === CREATED) {

            setPublished(true);
        } else {

            alert(uiText.response.error);
        }
    };

    /* TODO: Find a better way to split up functions than this. It introduces way too many prop-layers */
    return <Box m={"auto"} py={[4, 8, 16]}>
        <ResponseSectionForm
            page={page}
            published={published}
            emotion={emotion}
            setEmotion={setEmotion}
            setText={setText}
            checked={checked}
            setChecked={setChecked}
            setContactDetails={setContactDetails}
            onPostResponse={onPostResponse}
        />
    </Box>;
};
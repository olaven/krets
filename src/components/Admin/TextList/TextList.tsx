import { Card, Flex, Box, Text } from "rebass";
import { AdminPageContext } from "../../../context/AdminPageContext"
import { useContext, useState, useEffect } from "react";
import { ResponseModel, Emotion } from "../../../models";
import Emoji from "react-emoji-render";
import { Button } from "rebass"
import * as text from "../../../text";
import { FilterButtons } from "./FilterButtons";
import { TextCard } from "./TextCard";


export const TextList = () => {

    const { responses, responsesLoading } = useContext(AdminPageContext);
    const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([":-)", ":-|", ":-("]);

    if (responsesLoading || !responses)
        return <div>{text.responseList.loading}</div>

    if (!responses.length)
        return <div>{text.responseList.noResponses}</div>


    const filtered = responses
        .filter(({ text }) => text)
        .filter(({ emotion }) => selectedEmotions.includes(emotion))

    /* if (!filtered.length)
        return <div>Ingen svar med tekst som passer valgt filter</div> */

    return <Flex flexDirection={"column"} my={[1, 2, 3]}>
        <FilterButtons
            selected={selectedEmotions}
            setSelected={setSelectedEmotions}
        />
        <Box
            as='hr'
            sx={{
                bg: 'gray',
                border: 0,
                height: 1
            }}
        />
        {filtered
            .map(response =>
                <TextCard
                    key={response.id} response={response} />)}
    </Flex>
}
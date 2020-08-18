import { Flex, Box, Button } from "rebass";
import { AdminPageContext } from "../../../context/AdminPageContext"
import { useContext, useState } from "react";
import { Emotion } from "../../../models/models";
import * as text from "../../../text";
import { FilterButtons } from "./FilterButtons";
import { TextCard } from "./TextCard";


const Divider = () => <Box
    as='hr'
    sx={{
        bg: 'gray',
        border: 0,
        height: 1
    }}
/>

export const TextList = () => {

    const { responses, getNextResponses } = useContext(AdminPageContext);
    const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([":-)", ":-|", ":-("]);

    if (!responses)
        return <div>{text.responseList.loading}</div>

    if (!responses.length)
        return <div>{text.responseList.noResponses}</div>

    const cards = responses
        .filter(({ text }) => text)
        .filter(({ emotion }) => selectedEmotions.includes(emotion))
        .map(response => <TextCard
            key={response.id}
            response={response}
        />)

    return <Flex flexDirection={"column"} my={[1, 2, 3]}>
        <FilterButtons
            selected={selectedEmotions}
            setSelected={setSelectedEmotions}
        />
        <Divider />
        {cards}
        <Button onClick={getNextResponses}>Last flere</Button>
    </Flex>
}
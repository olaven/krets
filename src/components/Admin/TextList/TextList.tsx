import { Flex, Box } from "rebass";
import { AdminPageContext } from "../../../context/AdminPageContext"
import { useContext, useState } from "react";
import { Emotion } from "../../../models/models";
import * as text from "../../../text";
import { FilterButtons } from "./FilterButtons";
import { LoadMore } from "../../tiny/loader";
import { TextCards } from "./TextCards";


const Divider = () => <Box
    as='hr'
    sx={{
        bg: 'gray',
        border: 0,
        height: 1
    }}
/>

export const TextList = () => {

    const { responses, getNextResponses, moreResponsesAvailable, responsesLoading } = useContext(AdminPageContext);
    const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([":-)", ":-|", ":-("]);

    if (!responses)
        return <div>{text.responseList.loading}</div>

    if (!responses.length)
        return <div>{text.responseList.noResponses}</div>


    return <Flex flexDirection={"column"} my={[1, 2, 3]}>
        <FilterButtons
            selected={selectedEmotions}
            setSelected={setSelectedEmotions}
        />
        <Divider />
        <TextCards selectedEmotions={selectedEmotions} />
        {responses.length > 0 &&
            <LoadMore
                onClick={getNextResponses}
                active={moreResponsesAvailable}
                isLoading={responsesLoading} />}
    </Flex>
}
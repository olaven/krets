import { Card, Flex, Box, Text } from "rebass";
import { AdminPageContext } from "../../context/AdminPageContext"
import { useContext, useState } from "react";
import { ResponseModel, Emotion } from "../../models";
import Emoji from "react-emoji-render";
import * as text from "../../text";
import { emotionToNumeric } from "./Charts/ChartUtils";


const formatDate = (dateString: string) => {

    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currentYear = new Date().getFullYear();
    return `${day}/${month}${
        currentYear !== year ?
            `/${year}` : ``
        }`
}

const TextCard = ({ response }: { response: ResponseModel }) => <Card p={[0, 1, 2]} m={[0, 1, 2]} backgroundColor={"primary"} color="secondary">
    <Flex flexDirection="column">
        <Flex>
            <Emoji text={response.emotion}></Emoji>
            <Text opacity={0.5} fontSize={[1, 2, 3]}>{formatDate(response.created_at)}</Text>
            <Text fontSize={[1, 2, 3]}> {response.text}</Text>
        </Flex>
        {response.contact_details && <Text width={1} my={[0, 1, 2]}>
            {text.adminPage.contactDetails}: {response.contact_details}
        </Text>}
    </Flex>

</Card>

export const ResponseTextList = () => {

    const { responses, responsesLoading } = useContext(AdminPageContext);
    const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([":-)", ":-|", ":-("]);

    if (responsesLoading || !responses)
        return <div>{text.responseList.loading}</div>

    if (!responses.length)
        return <div>{text.responseList.noResponses}</div>


    const filtered = responses
        .filter(({ text }) => text)
        .filter(({ emotion }) => selectedEmotions.includes(emotion))

    if (!filtered.length)
        return <div>Ingen svar med tekst som passer valgt filter</div>

    return <Flex flexDirection={"column"} my={[1, 2, 3]}>{
        filtered
            .map(response =>
                <TextCard key={response.id} response={response} />)
    }</Flex>
}
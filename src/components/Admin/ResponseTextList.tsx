import { Card, Flex, Box, Text } from "rebass";
import { AdminPageContext } from "../../context/AdminPageContext"
import { useContext } from "react";
import { ReseponseModel } from "../../models";
import Emoji from "react-emoji-render";
import * as text from "../../text";

export const ResponseTextList = () => {

    const { responses, responsesLoading } = useContext(AdminPageContext);

    if (responsesLoading || !responses)
        return <div>{text.responseList.loading}</div>

    if (!responses.length)
        return <div>{text.responseList.noResponses}</div>

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


    const ResponseCard = ({ response }: { response: ReseponseModel }) => <Card p={[0, 1, 2]} m={[0, 1, 2]} backgroundColor={"primary"} color="secondary">
        <Flex>
            <Emoji text={response.emotion}></Emoji>
            <Text opacity={0.5} fontSize={[1, 2, 3]}>{formatDate(response.created_at)}</Text>
            <Text fontSize={[1, 2, 3]}> {response.text}</Text>
        </Flex>

    </Card>

    return <Flex flexDirection={"column"} my={[1, 2, 3]}>{
        responses
            .filter(response => response.text)
            .map(response =>
                <ResponseCard key={response.id} response={response} />)
    }</Flex>
}
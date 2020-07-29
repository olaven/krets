import { Card, Flex, Text } from "rebass";
import { Emoji } from "react-emoji-render"
import { ResponseModel } from "../../../models";
import * as text from "../../../text";

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

export const TextCard = ({ response }: { response: ResponseModel }) => <Card p={[0, 1, 2]} m={[0, 1, 2]} backgroundColor={"primary"} color="secondary">
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
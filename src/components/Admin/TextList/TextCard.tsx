import { OK } from "node-kall";
import { Card, Box, Flex, Text } from "rebass";
import Emoji from "react-emoji-render";
import { AnswerModel, ResponseModel } from "../../../models/models";
import * as text from "../../../text";
import { AdminPageContext } from "../../../context/AdminPageContext";
import { useContext, useEffect, useState } from "react";
import { asyncEffect } from "../../../effects/asyncEffect";
import { getAnswers } from "../../../fetchers";


const formatDate = (dateString: string) => {

    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currentYear = new Date().getFullYear();
    return `${day}/${month}${currentYear !== year ?
        `/${year}` : ``
        }`
}


export const TextCard = ({ response }: { response: ResponseModel }) => {

    const { page } = useContext(AdminPageContext);

    const [answers, setAnswers] = useState<AnswerModel[]>(null);

    asyncEffect(async () => {

        const [status, answers] = await getAnswers(page.id, response.id);
        if (status === OK) {

            console.log("received answers:", answers);
            setAnswers(answers)
        } else {

            console.error(`${status} when fetching responses`);
        }
    }, []);

    return answers?.length > 0 && answers[0].text ?
        <Card p={[0, 1, 2]} m={[0, 1, 2]} backgroundColor={"primary"} color={"secondary"}>
            <Flex flexDirection="column">
                <Flex>
                    <Emoji text={response.emotion} />
                    <Text mx={[1]} opacity={0.5} fontSize={[1, 2, 3]}>{formatDate(response.created_at)}</Text>
                    {answers.map(answer => //TODO: expand once more questions (and thus more answers) are actually something that happens
                        <Text fontSize={[1, 2, 3]}> {answer.text}</Text>
                    )}

                </Flex>
                {response.contact_details &&
                    <Text width={1} my={[0, 1, 2]}>
                        {text.adminPage.contactDetails}: {response.contact_details}
                    </Text>}
            </Flex>
        </Card> :
        null
}

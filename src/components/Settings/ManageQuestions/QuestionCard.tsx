import * as uiText from "../../../text";
import { NO_CONTENT } from "node-kall";
import { Button, Card, Flex, Text } from "rebass";
import { Input } from "@rebass/forms";
import { QuestionModel } from "../../../models/models";
import { useState } from "react";
import { updateQuestion } from "../../../fetchers";

const DeleteQuestion = () => {

    const onDelete = async () => { console.error("Not implemented") }
    return <Button backgroundColor="failure" onClick={onDelete}>
        {uiText.settings.questions.deleteButton}
    </Button>
}

const UpdateQuestion = ({ question, text }: { question: QuestionModel, text: string }) => {

    const onUpdate = async () => {

        const [status] = await updateQuestion({
            ...question,
            text
        });

        if (status === NO_CONTENT) {

            console.log("OPPDATERT :D");
        } else {

            console.log("Oh no", status);
        }
    }
    return <Button backgroundColor="attention" fontSize={[1]} onClick={onUpdate}>
        {uiText.settings.questions.updateButton}
    </Button>
}

export const QuestionCard = ({ question }: { question: QuestionModel }) => {

    console.log("question in card: ", question);
    const [text, setText] = useState(question.text);

    return <Card my={[1, 2, 3]}>
        <Flex>
            <Input value={text} onChange={(event) => { setText(event.target.value) }} />
            <UpdateQuestion question={question} text={text} />
            <DeleteQuestion />
        </Flex>
    </Card>
}
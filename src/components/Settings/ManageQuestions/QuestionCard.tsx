import * as uiText from "../../../text";
import { NO_CONTENT } from "node-kall";
import { Button, Card, Flex } from "rebass";
import { Input } from "@rebass/forms";
import { QuestionModel } from "../../../models/models";
import { useState } from "react";
import { updateQuestion } from "../../../fetchers";

const DeleteQuestion = () => {

    const onDelete = async () => { console.error("Not implemented") }
    return <Button width={[1 / 4, 1 / 8]} mx={[1]} backgroundColor="failure" onClick={onDelete}>
        {uiText.settings.questions.deleteButton}
    </Button>
}

const UpdateQuestion = ({ question, text }: { question: QuestionModel, text: string }) => {

    const [buttonText, setButtonText] = useState(uiText.settings.questions.updateButton);

    const onUpdate = async () => {

        const [status] = await updateQuestion({
            ...question,
            text
        });

        //NOTE: not very readable, but kind of fun :-D
        status === NO_CONTENT ?
            (() => {

                setButtonText("✅");
                setTimeout(() => {
                    setButtonText(uiText.settings.questions.updateButton);
                }, 1000)
            })() :
            (() => {
                console.error(`${status} when updating question..`);
            });
    }
    return <Button width={[1 / 4, 1 / 8]} mx={[1]} fontSize={[1]} onClick={onUpdate}>
        {buttonText}
    </Button>
}

export const QuestionCard = ({ question }: { question: QuestionModel }) => {

    const [text, setText] = useState(question.text);

    return <Card my={[1, 2, 3]}>
        <Flex>
            <Input value={text} onChange={(event) => { setText(event.target.value) }} />
            <UpdateQuestion question={question} text={text} />
            <DeleteQuestion />
        </Flex>
    </Card>
}
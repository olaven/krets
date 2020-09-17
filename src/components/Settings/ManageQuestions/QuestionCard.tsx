import * as uiText from "../../../text";
import { NO_CONTENT, OK } from "node-kall";
import { Button, Card, Flex } from "rebass";
import { Input } from "@rebass/forms";
import { QuestionModel } from "../../../models/models";
import { useContext, useState } from "react";
import { deleteQuestion, updateQuestion } from "../../../fetchers";
import { TriggerLoadingButton } from "../../tiny/buttons";
import { QuestionsContext } from "../../../context/QuestionsContext";

const DeleteQuestion = ({ question }: { question: QuestionModel }) => {

    const { refreshQuestions } = useContext(QuestionsContext);

    const onDelete = async () => {

        const [status] = await deleteQuestion(question);

        if (status !== OK) alert(`error deleting question..`);
        else refreshQuestions();
    }
    return <TriggerLoadingButton
        text={uiText.settings.questions.deleteButton}
        action={onDelete}
        backgroundColor="failure"
    />
}

export const QuestionCard = ({ question }: { question: QuestionModel }) => {

    const [text, setText] = useState(question.text);

    const onUpdate = async () => {

        const [status] = await updateQuestion({
            ...question,
            text
        });

        if (status !== NO_CONTENT)
            console.error(`${status} when updating question..`);
    }

    return <Card my={[1]}>
        <Flex>
            <Input value={text} onChange={(event) => { setText(event.target.value) }} />
            <TriggerLoadingButton
                action={onUpdate}
                text={uiText.settings.questions.updateButton} />
            <DeleteQuestion question={question} />
        </Flex>
    </Card>
}
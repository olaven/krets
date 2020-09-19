import * as uiText from "../../../text";
import { NO_CONTENT, OK } from "node-kall";
import { Button, Card, Flex } from "rebass";
import { Input } from "@rebass/forms";
import { QuestionModel } from "../../../models/models";
import { useContext, useState } from "react";
import { deleteQuestion, updateQuestion } from "../../../fetchers";
import { TriggerLoadingButton } from "../../tiny/buttons";
import { QuestionsContext } from "../../../context/QuestionsContext";

/* const ArchiveQuestion = ({ question }: { question: QuestionModel }) => {

    const { refreshQuestions } = useContext(QuestionsContext);

    const onDelete = async () => {

        const [status] = await updateQuestion({
            ...question,
            archived: true
        });

        if (status !== NO_CONTENT) alert(`error deleting question..`);
        else refreshQuestions();
    }
    return <TriggerLoadingButton
        text={uiText.settings.questions.deleteButton}
        action={onDelete}
        backgroundColor="failure"
    />
} */

export const QuestionCard = ({ question }: { question: QuestionModel }) => {

    const { refreshQuestions } = useContext(QuestionsContext);
    const [text, setText] = useState(question.text);

    const onUpdate = (updater: (question: QuestionModel) => QuestionModel) =>
        async () => {

            const [status] = await updateQuestion(
                updater(question)
            );

            if (status !== NO_CONTENT)
                console.error(`${status} when updating question..`);

            await refreshQuestions();
        }

    return <Card my={[1]}>
        <Flex>
            <Input value={text} onChange={(event) => { setText(event.target.value) }} />
            <TriggerLoadingButton
                action={onUpdate(question => ({ ...question, text }))}
                text={uiText.settings.questions.updateButton} />
            <TriggerLoadingButton
                text={uiText.settings.questions.archiveButton}
                action={onUpdate(question => ({ ...question, archived: true }))}
                backgroundColor="failure"
            />
        </Flex>
    </Card>
}
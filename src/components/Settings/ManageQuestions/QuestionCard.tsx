import * as uiText from "../../../text";
import { NO_CONTENT } from "node-kall";
import { Button, Card, Flex, Text } from "rebass";
import { Input } from "@rebass/forms";
import { QuestionModel } from "../../../models/models";
import { useContext, useState } from "react";
import { updateQuestion } from "../../../fetchers";
import { QuestionsContext } from "../../../context/QuestionsContext";

const DeleteQuestion = () => {

    const onDelete = async () => { console.error("Not implemented") }
    return <Button width={[1 / 4, 1 / 8]} backgroundColor="failure" onClick={onDelete}>
        {uiText.settings.questions.deleteButton}
    </Button>
}

const UpdateQuestion = ({ question, text }: { question: QuestionModel, text: string }) => {

    //THINKABOUT: innefficient to update _all_ questions
    //const { refreshQuestions } = useContext(QuestionsContext);

    const [buttonText, setButtonText] = useState(uiText.settings.questions.updateButton);

    const onUpdate = async () => {

        const [status] = await updateQuestion({
            ...question,
            text
        });

        if (status === NO_CONTENT) {

            setButtonText("✅");
            setTimeout(() => {
                setButtonText(uiText.settings.questions.updateButton);
            }, 1500)
        } else {

            console.error(`${status} when updating question..`);
        }
    }
    return <Button backgroundColor="attention" width={[1 / 4, 1 / 8]} fontSize={[1]} onClick={onUpdate}>
        {buttonText}
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
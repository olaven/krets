import * as uiText from "../../../text";
import { NO_CONTENT } from "node-kall";
import { Button, Card, Flex } from "rebass";
import { Input } from "@rebass/forms";
import { QuestionModel } from "../../../models/models";
import { useState } from "react";
import { updateQuestion } from "../../../fetchers";
import { TriggerLoadingButton } from "../../tiny/buttons";

const DeleteQuestion = () => {

    const onDelete = async () => {
        //TODO: implement
        console.error("Not implemented");
        alert("Sletting er ikke implementert enda. Men du kan oppdatere :-)");
    }
    return <Button mx={1} my={0.5} backgroundColor="failure" onClick={onDelete}>
        {uiText.settings.questions.deleteButton}
    </Button>
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
            <DeleteQuestion />
        </Flex>
    </Card>
}
import * as uiText from "../../../text";
import { NO_CONTENT } from "node-kall";
import { QuestionModel } from "../../../models/models";
import { useContext, useState } from "react";
import { updateQuestion } from "../../../fetchers";
import { DoubleConfirmationButton, TriggerLoadingButton } from "../../standard/buttons";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { ColumnContainer, RowContainer } from "../../standard/Containers";
import { TextInput } from "../../standard/Input";
import { ArrowButton } from "../../standard/Button"
import { styled } from "../../../stiches.config";


const ButtonContainer = styled(RowContainer, {

    justifyContent: "right",
});

const Container = styled(ColumnContainer, {

    paddingBottom: "$21",
});

const QuestionInput = styled(TextInput, {
    width: "40ch"
});

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

    return <Container>
        <RowContainer>
            <QuestionInput value={text} onChange={(event) => { setText(event.target.value) }} />
        </RowContainer>
        <RowContainer>
            <ColumnContainer>
                <ArrowButton size={35} direction="up" inverted circular />
                <ArrowButton size={35} direction="down" inverted circular />
            </ColumnContainer>
            <ButtonContainer>

                <TriggerLoadingButton
                    action={onUpdate(question => ({ ...question, text }))}
                    text={uiText.settings.questions.updateButton} />
                <DoubleConfirmationButton
                    text={uiText.settings.questions.archiveButton}
                    action={onUpdate(question => ({ ...question, archived: true }))}
                />
            </ButtonContainer>
        </RowContainer>
    </Container>
}
import * as uiText from "../../../text";
import { NO_CONTENT } from "node-kall";
import { QuestionModel } from "../../../models/models";
import { useContext, useState } from "react";
import { updateQuestion } from "../../../fetchers";
import { DoubleConfirmationButton, TriggerLoadingButton } from "../../standard/buttons";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { ColumnContainer, RowContainer } from "../../standard/Containers";
import { TextInput, QuestionInput } from "../../standard/Input";
import { ArrowButton } from "../../standard/Button"
import { styled } from "../../../stiches.config";
import { reorder, Direction } from "./reorder";


const PaddedColumnContainer = styled(ColumnContainer, {

    paddingBottom: "$21",
});

const CenteredRowContainer = styled(RowContainer, {
    justifyContent: "center"
});



const sendOrderToBackend = (questions: QuestionModel[]) =>
    Promise.all(
        questions
            .map((question, index) => ({ ...question, display_order: index }))
            .map(question => updateQuestion(question))
    );


export const QuestionCard = ({ question }: { question: QuestionModel }) => {

    const { refreshQuestions, questions } = useContext(QuestionsContext);
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

    const onReorder = (direction: Direction) =>
        async () => {

            const reordered = reorder<QuestionModel>(direction)(question, questions);
            await sendOrderToBackend(reordered);
            await refreshQuestions();
        }

    return <PaddedColumnContainer>
        <RowContainer>
            <ColumnContainer>
                <ArrowButton size={35} direction="up" inverted circular onClick={onReorder("left")} />
                <ArrowButton size={35} direction="down" inverted circular onClick={onReorder("right")} />
            </ColumnContainer>
            <QuestionInput value={text} onChange={(event) => { setText(event.target.value) }} />
        </RowContainer>
        <CenteredRowContainer>

            <TriggerLoadingButton
                action={onUpdate(question => ({ ...question, text }))}
                text={uiText.settings.questions.updateButton} />
            <DoubleConfirmationButton
                text={uiText.settings.questions.archiveButton}
                action={onUpdate(question => ({ ...question, archived: true }))}
            />
        </CenteredRowContainer>
    </PaddedColumnContainer>
}
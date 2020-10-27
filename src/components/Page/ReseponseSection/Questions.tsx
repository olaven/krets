import { AnswerModel, Emotion, QuestionModel } from "../../../models/models";
import * as uiText from "../../../text";
import { useContext, useState } from "react";
import { styled } from "../../../stiches.config";
import { Checkbox as StichesCheckbox } from "../../standard/Checkbox"
import { TextInput, QuestionInput } from "../../standard/Input";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { Label } from "../../standard/Text";
import { ColumnContainer } from "../../standard/Containers";

const getDefaultPlaceholder = (emotion: Emotion) => ({
    ":-)": uiText.response.placeholder.happy,
    ":-|": uiText.response.placeholder.neutral,
    ":-(": uiText.response.placeholder.sad,
}[emotion]);

const applyDefaultQuestion = (emotion: Emotion, questions: QuestionModel[]):
    QuestionModel[] =>
    questions.length === 0 ?
        [{
            id: null,
            text: getDefaultPlaceholder(emotion), //NOTE: This is the question question that will be asked if no custom questions are defined
            page_id: null,
            archived: false,
        }] :
        questions

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
});

const CheckboxContainer = styled("div", {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: "$21",
});

const QuestionContainer = styled(ColumnContainer, {
    paddingLeft: "$21",
});

type Props = { emotion: Emotion, answers: Map<string, AnswerModel>, setAnswers: (answers: Map<string, AnswerModel>) => void }
export const Questions = ({ emotion, answers, setAnswers }: Props) => {

    const { questions } = useContext(QuestionsContext);

    const [visible, setVisible] = useState(false);

    return <Container>
        <CheckboxContainer>
            <StichesCheckbox
                checked={visible}
                onChange={() => setVisible(!visible)}
            />
            <span>{uiText.response.customQuestionsCheckbox}</span>
        </CheckboxContainer>
        {visible && applyDefaultQuestion(emotion, questions).map(question => (
            <QuestionContainer key={question.id || 1}>
                <Label>{question.text}</Label>
                <QuestionInput
                    aria-label="response-text-input"
                    placeholder={uiText.response.placeholder.standard}
                    onChange={event => {

                        //FIXME: bad to manipulate by reference like this, instead of actually updating state
                        answers.set(question.id || "DEFAULT", {
                            text: event.target.value,
                            question_id: question.id
                        });
                    }}
                />
            </QuestionContainer >)
        )
        }
    </Container >
}

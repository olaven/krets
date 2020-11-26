import { AnswerModel, Emotion, QuestionModel } from "../../../models/models";
import * as uiText from "../../../helpers/text";
import { useContext, useState } from "react";
import { styled } from "../../../stiches.config";
import { Checkbox as StichesCheckbox } from "../../standard/Checkbox"
import { QuestionInput } from "../../standard/Input";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { Label} from "../../standard/Text";
import { ColumnContainer } from "../../standard/Containers";
import { defaultQuestion } from "../../../helpers/defaultQuestion";


const applyDefaultQuestion = (emotion: Emotion, questions: QuestionModel[]):
    QuestionModel[] =>
    questions.length === 0 ?
        [defaultQuestion(emotion)] :
        questions

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
});

const CheckboxContainer = styled("div", {
    display: "flex",
    justifyContent: "center",

    alignItems: "center",
    flexDirection: "column",
    marginBottom: "$55",
});

const QuestionContainer = styled(ColumnContainer, {
    paddingLeft: "$21",
    alignItems: "left"
});




type Props = { emotion: Emotion, answers: Map<string, AnswerModel>, setAnswers: (answers: Map<string, AnswerModel>) => void }
export const Questions = ({ emotion, answers, setAnswers }: Props) => {

    const { questions } = useContext(QuestionsContext);

    const [visible, setVisible] = useState(false);

    return <Container>
        <CheckboxContainer>
            <span>{uiText.response.customQuestionsCheckbox}</span>
            <StichesCheckbox
                checked={visible}
                onChange={() => setVisible(!visible)}
            />
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

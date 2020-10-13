import { Flex } from "rebass";
import { Input, Checkbox, Label } from "@rebass/forms";
import { AnswerModel, Emotion, QuestionModel } from "../../../models/models";
import * as uiText from "../../../text";
import { useContext, useEffect, useState } from "react";
import { styled } from "../../../stiches.config";
import { Checkbox as StichesCheckbox } from "../../standard/Checkbox"
import { TextInput } from "../../standard/Input";
import { QuestionsContext } from "../../../context/QuestionsContext";

const getDefaultPlaceholder = (emotion: Emotion) => ({
    ":-)": uiText.response.placeholder.happy,
    ":-|": uiText.response.placeholder.neutral,
    ":-(": uiText.response.placeholder.sad,
}[emotion]);

const applyyDefaultQuestion = (emotion: Emotion, questions: QuestionModel[]) =>
    questions.length === 0 ?
        [{
            id: null,
            text: getDefaultPlaceholder(emotion)
        }] :
        questions


//TODO: Make this replace every function below 
type Props = { emotion: Emotion, answers: Map<string, AnswerModel>, setAnswers: (answers: Map<string, AnswerModel>) => void }
export const Questions = ({ emotion, answers, setAnswers }: Props) => {

    const { questions } = useContext(QuestionsContext);

    const [visible, setVisible] = useState(false);

    const Container = styled("div", {
        display: "flex",
        flexDirection: "column",
    });

    const CheckboxContainer = styled("div", {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
    })

    return <Container>
        <CheckboxContainer>
            <StichesCheckbox
                checked={visible}
                onChange={() => setVisible(!visible)}
            />
            <span>{uiText.response.customQuestionsCheckbox}</span>
        </CheckboxContainer>
        {visible && applyyDefaultQuestion(emotion, questions)
            .map(question =>
                <TextInput
                    key={question.id || 1}
                    aria-label="response-text-input"
                    placeholder={question.text}
                    onChange={event => {

                        //FIXME: bad to manipulate by reference like this, instead of actually updating state
                        answers.set(question.id || "DEFAULT", {
                            text: event.target.value,
                            question_id: question.id
                        });
                    }}
                />)
        }
    </Container >
}

/**
 * TODO: deprecate in favour of stiches-approacah with new design!
 */
/*
type QuestionProps = { placeholder: string, onChange: (text: string) => void };
const Question = ({ onChange, placeholder }: QuestionProps) =>
    <Flex p={[1]}>
        <Input
            aria-label="response-text-input"
            placeholder={placeholder}
            onChange={event => {
                onChange(event.target.value)
            }}
        />
    </Flex>



type DefaultProps = { setAnswers: (answers: Map<string, AnswerModel>) => void, answers: Map<string, AnswerModel>, emotion: Emotion };
export const DefaultQuestion = ({ setAnswers, answers, emotion }: DefaultProps) =>
    <Question
        placeholder={getDefaultPlaceholder(emotion)}
        onChange={text => {

            const updated = new Map<string, AnswerModel>();
            updated.set("DEFAULT", {
                text
            });
            setAnswers(updated);
        }}
    />

type CustomProps = { setAnswers: (answers: Map<string, AnswerModel>) => void, answers: Map<string, AnswerModel>, question: QuestionModel, }
const CustomQuestion = ({ setAnswers, answers, question, }: CustomProps) =>
    <Question
        placeholder={question.text}
        onChange={text => {

            const copy = new Map(answers.entries())
            copy.set(question.id, {
                text,
                question_id: question.id
            })
            setAnswers(copy);
        }} />

type CustomQuestionsProps = { setAnswers: (answers: Map<string, AnswerModel>) => void, answers: Map<string, AnswerModel>, questions: QuestionModel[] }
export const CustomQuestions = ({ setAnswers, answers, questions }: CustomQuestionsProps) => {

    const [checked, setChecked] = useState(false);

    return <>
        <Label width={[]} fontSize={[1]} p={[1, 2]}>
            <Checkbox
                onChange={() => { setChecked(!checked) }}
                checked={checked}
            />
            {uiText.response.customQuestionsCheckbox}
        </Label >
        {checked && questions.map(question =>
            <CustomQuestion
                key={question.id}
                question={question}
                answers={answers}
                setAnswers={setAnswers}
            />
        )}
    </>


}
 */
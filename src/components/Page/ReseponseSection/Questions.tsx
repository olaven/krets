import { Flex } from "rebass";
import { Input, Checkbox, Label } from "@rebass/forms";
import { AnswerModel, Emotion, QuestionModel } from "../../../models/models";
import * as uiText from "../../../text";
import { useState } from "react";



type QuestionProps = { placeholder: string, onClick: (text: string) => void };
const Question = ({ onClick, placeholder }: QuestionProps) =>
    <Flex p={[1]}>
        <Input
            aria-label="response-text-input"
            placeholder={placeholder}
            onChange={event => {
                onClick(event.target.value)
            }}
        />
    </Flex>


const getDefaultPlaceholder = (emotion: Emotion) => ({
    ":-)": uiText.response.placeholder.happy,
    ":-|": uiText.response.placeholder.neutral,
    ":-(": uiText.response.placeholder.sad,
}[emotion]);


type DefaultProps = { setAnswers: (answers: AnswerModel[]) => void, emotion: Emotion };
export const DefaultQuestion = ({ setAnswers, emotion }: DefaultProps) =>
    <Question
        placeholder={getDefaultPlaceholder(emotion)}
        onClick={text => {
            setAnswers([
                { text }
            ])
        }}
    />

type CustomProps = { answers: AnswerModel[], setAnswers: (answers: AnswerModel[]) => void, question: QuestionModel }
const CustomQuestion = ({ answers, setAnswers, question }: CustomProps) =>
    <Question
        placeholder={question.text}
        onClick={text => {
            setAnswers([
                ...answers,
                {
                    text: text,
                    question_id: question.id
                }
            ])
        }} />

type CustomQuestionsProps = { answers: AnswerModel[], setAnswers: (answers: AnswerModel[]) => void, questions: QuestionModel[] }
export const CustomQuestions = ({ answers, setAnswers, questions }: CustomQuestionsProps) => {

    const [checked, setChecked] = useState(false);


    return <>
        <Label width={[]} fontSize={[1]} p={[1, 2]}>
            <Checkbox
                onChange={() => { setChecked(!checked) }}
                checked={checked}
            />
            {uiText.response.prefixCustomQuestionCheckbox} {questions.length} {uiText.response.suffixCustomQuestionCheckbox}
        </Label >
        {checked && questions.map(question =>
            <CustomQuestion
                key={question.id}
                question={question}
                answers={answers}
                setAnswers={setAnswers} />
        )}
    </>


}

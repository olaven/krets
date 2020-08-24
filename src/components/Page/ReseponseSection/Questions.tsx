import { Flex } from "rebass";
import { Input, Checkbox, Label } from "@rebass/forms";
import { AnswerModel, Emotion, QuestionModel } from "../../../models/models";
import * as uiText from "../../../text";
import { useEffect, useState } from "react";



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


const getDefaultPlaceholder = (emotion: Emotion) => ({
    ":-)": uiText.response.placeholder.happy,
    ":-|": uiText.response.placeholder.neutral,
    ":-(": uiText.response.placeholder.sad,
}[emotion]);


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
            {uiText.response.prefixCustomQuestionCheckbox} {questions.length} {uiText.response.suffixCustomQuestionCheckbox}
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

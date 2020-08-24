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


type DefaultProps = { answers: Map<string, AnswerModel>, emotion: Emotion };
export const DefaultQuestion = ({ answers, emotion }: DefaultProps) =>
    <Question
        placeholder={getDefaultPlaceholder(emotion)}
        onChange={text => {

            answers.set("DEFAULT", {
                text
            });
        }}
    />

type CustomProps = { answers: Map<string, AnswerModel>, question: QuestionModel, }
const CustomQuestion = ({ answers, question, }: CustomProps) =>
    <Question
        placeholder={question.text}
        onChange={text => {

            console.log("updating", answers);
            answers.set(question.id, {
                text,
                question_id: question.id
            })
        }} />

type CustomQuestionsProps = { answers: Map<string, AnswerModel>, questions: QuestionModel[] }
export const CustomQuestions = ({ answers, questions }: CustomQuestionsProps) => {

    const [checked, setChecked] = useState(false);

    useEffect(() => {

        if (checked) return;

        /**
         * As I am not using React State (but a map)
         * I have to clean it up automatically. In other words, 
         * it is not tied to the input, as normal "primitive" state 
         * values whould have been. 
         * 
         * This is not ideal
         * //THINKABOUT: how to solve the problem of multiple questions
         */
        Array.from(answers.keys()).forEach(key => {
            answers.delete(key);
        });
    }, [checked])

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
            />
        )}
    </>


}

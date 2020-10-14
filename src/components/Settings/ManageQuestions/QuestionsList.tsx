import * as text from "../../../text"
import { useContext } from "react";
import { Heading } from "rebass";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { Loader } from "../../standard/loader";
import { QuestionCard } from "./QuestionCard";



export const QuestionsList = () => {

    const { loading, questions } = useContext(QuestionsContext);

    return loading ?
        <Loader size={150} /> :
        <>
            <Heading opacity={0.5}>{text.settings.questions.listHeader}</Heading>
            {questions.map(question =>
                <QuestionCard key={question.id} question={question} />)}
        </>
}
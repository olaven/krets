import * as text from "../../../text"
import { useContext } from "react";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { Loader } from "../../standard/loader";
import { QuestionCard } from "./QuestionCard";
import { H1 } from "../../standard/Heading"



export const QuestionsList = () => {

    const { loading, questions } = useContext(QuestionsContext);

    return loading ?
        <Loader size={150} /> :
        <>
            <H1 alignment="left">{text.settings.questions.listHeader}</H1>
            {questions.map(question =>
                <QuestionCard key={question.id} question={question} />)}
        </>
}
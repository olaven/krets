import { useContext } from "react";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { Loader } from "../../tiny/loader";
import { QuestionCard } from "./QuestionCard";



export const QuestionsList = () => {

    const { loading, questions } = useContext(QuestionsContext);

    return loading ?
        <Loader size={150} /> :
        <div>
            {questions.map(question =>
                <QuestionCard key={question.id} question={question} />)}
        </div>
}
import { useContext } from "react";
import Loader from "react-spinners/BounceLoader";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { QuestionCard } from "./QuestionCard";



export const QuestionsList = () => {

    const { loading, questions } = useContext(QuestionsContext);

    return loading ?
        <Loader size={150} /> :
        <>
            {questions.map(question =>
                <QuestionCard question={question} />)}
        </>
}
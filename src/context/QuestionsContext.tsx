import { createContext, useState, useEffect, ReactChildren } from "react";
import { OK, filterBody } from "node-kall";
import { QuestionModel } from "../models/models";
import { getQuestions, updateQuestion } from "../fetchers";
import arrayMove from "array-move";
import { reorder } from "./reorder";

interface IQuestionsContext {
    loading: boolean,
    questions: QuestionModel[]
    moreQuestionsAreAllowed: boolean,
    refreshQuestions: () => Promise<void>,
}

export const QuestionsContext = createContext<IQuestionsContext>({
    loading: true,
    questions: [],
    moreQuestionsAreAllowed: true,
    refreshQuestions: async () => { }
});


const sendOrderToBackend = (questions: QuestionModel[]) =>
    Promise.all(
        questions
            .map(question => filterBody(updateQuestion(question))) //FIXME: make backend return updated question + use that as new state here
    )


type Props = { pageId: string, includeArchived: boolean, children: React.ReactNode }
export const QuestionsContextProvider = ({ pageId, includeArchived, children }: Props) => {

    const [questions, setQuestions] = useState<QuestionModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [moreQuestionsAreAllowed, setMoreQuestionsAreAllowed] = useState(true);

    //scoped in function, as it should be provided to consumers
    const refreshQuestions = async () => {

        const [status, questions] = await getQuestions(pageId, includeArchived);

        if (status === OK) setQuestions(questions);
        else console.error(`${status} when fetching questions..`);

        setLoading(false);
    }

    useEffect(() => {
        setMoreQuestionsAreAllowed(
            questions.length < 3
        );
    }, [questions.length]);


    useEffect(() => {

        refreshQuestions();
    }, [pageId]);


    return <QuestionsContext.Provider value={{ questions, loading, moreQuestionsAreAllowed, refreshQuestions }}>
        {children}
    </QuestionsContext.Provider>
};
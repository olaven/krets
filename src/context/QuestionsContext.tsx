import { createContext, useState, useEffect, } from "react";
import { get, OK } from "node-kall";
import { QuestionModel } from "../models/models";
import { getQuestions } from "../fetchers";

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



export const QuestionsContextProvider = ({ pageId, children }) => {

    const [questions, setQuestions] = useState<QuestionModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [moreQuestionsAreAllowed, setMoreQuestionsAreAllowed] = useState(true);

    //scoped in function, as it should be provided to consumers
    const refreshQuestions = async () => {

        const [status, questions] = await getQuestions(pageId);

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
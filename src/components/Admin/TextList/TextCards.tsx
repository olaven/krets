import { useContext } from "react";
import { AdminPageContext } from "../../../context/AdminPageContext";
import { QuestionsContextProvider } from "../../../context/QuestionsContext";
import { TextCard } from "./TextCard"


export const TextCards = ({ selectedEmotions }) => {

    const { responses, page } = useContext(AdminPageContext);

    //NOTE: Loading questions in common through context, instead of once per answer
    return <QuestionsContextProvider pageId={page.id}>
        {responses
            .filter(({ emotion }) => selectedEmotions.includes(emotion))
            .map(response => <TextCard
                key={response.id}
                response={response}
            />)}
    </QuestionsContextProvider >;
}
import { useContext } from "react";
import { QuestionsContextProvider } from "../../../context/QuestionsContext";
import { HomeContext } from "../../../context/HomeContext";
import { ColumnContainer } from "../../standard/Containers";
import { QuestionCreator } from "./QuestionCreator";
import { QuestionsList } from "./QuestionsList";

/**
 * Provides functionality for: 
 * * create questions for the page (max 3?)
 * * update questions for the page 
 * * delete questions for the page 
 */
export const ManageQuestions = () => {

    const { page } = useContext(HomeContext);

    return <QuestionsContextProvider pageId={page.id} includeArchived={false}>
        <ColumnContainer>
            <QuestionCreator />
            <QuestionsList />
        </ColumnContainer>
    </QuestionsContextProvider >

}
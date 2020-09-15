import { Heading, Text } from "rebass";
import * as uiText from "../../../text";
import { useContext } from "react";
import { QuestionsContextProvider } from "../../../context/QuestionsContext";
import { SettingsContext } from "../../../context/SettingsContext";
import { QuestionCreator } from "./QuestionCreator";
import { QuestionsList } from "./QuestionsList";


/**
 * SHould provide functionality for: 
 * * create questions for the page (max 3?)
 * * update questions for the page 
 * * delete questions for the page (??) -> THINKABOUT: how to handle answers for deleted questions? 
 */
export const ManageQuestions = () => {

    const { page } = useContext(SettingsContext);

    return <QuestionsContextProvider pageId={page.id}>
        <Heading opacity={0.5}>{uiText.settings.questions.heading}</Heading>
        <Text color={"attention"}>{uiText.settings.questions.unstable}</Text>
        <QuestionCreator />
        <QuestionsList />
    </QuestionsContextProvider >

}
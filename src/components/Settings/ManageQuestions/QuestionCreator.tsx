import { CREATED } from "node-kall";
import * as uiText from "../../../helpers/text";
import { useContext, useState } from "react";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { HomeContext } from "../../../context/HomeContext";
import { postQuestion } from "../../../helpers/fetchers";
import { TriggerLoadingButton } from "../../standard/buttons";
import { ColumnContainer } from "../../standard/Containers";
import { H1 } from "../../standard/Heading"
import { TextInput } from "../../standard/Input";
import { styled } from "../../../stiches.config";


export const QuestionCreator = () => {

    const { page } = useContext(HomeContext);
    const { moreQuestionsAreAllowed, refreshQuestions } = useContext(QuestionsContext);

    const [text, setText] = useState("");

    const onCreateQuestion = async () => {

        const [status, question] = await postQuestion({
            text,
            page_id: page.id,
            archived: false
        });

        if (status === CREATED) {

            setText("");
            refreshQuestions();
        }
    }


    //TODO: Different message if more questions aren't allowed 
    return moreQuestionsAreAllowed &&
        <ColumnContainer as='form' onSubmit={e => e.preventDefault()}>

            <H1 left>{uiText.settings.questions.createQuestion}</H1>
            <TextInput
                aria-label="questionname-input"
                placeholder={uiText.settings.questions.placeholder}
                onChange={({ target: { value } }) => {
                    setText(value);
                }}
                value={text}
            />
            <TriggerLoadingButton
                text={uiText.settings.questions.createButton}
                action={onCreateQuestion}
            />


        </ColumnContainer >

}
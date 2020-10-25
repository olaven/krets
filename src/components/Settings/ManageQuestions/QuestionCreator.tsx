import { CREATED } from "node-kall";
import * as uiText from "../../../text";
import { useContext, useState } from "react";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { SettingsContext } from "../../../context/SettingsContext";
import { postQuestion } from "../../../fetchers";
import { TriggerLoadingButton } from "../../standard/buttons";
import { ColumnContainer } from "../../standard/Containers";
import { H1 } from "../../standard/Heading"
import { TextInput } from "../../standard/Input";


export const QuestionCreator = () => {

    const { page } = useContext(SettingsContext);
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
            <H1 alignment="left" >{uiText.settings.questions.createQuestion}</H1>

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


        </ColumnContainer>

}
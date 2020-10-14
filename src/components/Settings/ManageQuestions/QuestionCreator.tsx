import { Flex, Button, Box, Heading } from "rebass";
import { CREATED } from "node-kall";
import { Input } from "@rebass/forms";
import * as uiText from "../../../text";
import { useContext, useState } from "react";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { SettingsContext } from "../../../context/SettingsContext";
import { postQuestion } from "../../../fetchers";
import { TriggerLoadingButton } from "../../standard/buttons";


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
        <Box as='form' onSubmit={e => e.preventDefault()}>
            <Heading opacity={0.5}>{uiText.settings.questions.createQuestion}</Heading>
            <Flex>
                <Input
                    aria-label="questionname-input"
                    placeholder={uiText.settings.questions.placeholder}
                    onChange={({ target: { value } }) => {
                        setText(value);
                    }}
                    value={text}
                    mx={1}
                />
                <TriggerLoadingButton
                    text={uiText.settings.questions.createButton}
                    action={onCreateQuestion}
                />
            </Flex>

        </Box>

}
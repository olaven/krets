import { Flex, Button, Heading, Box } from "rebass";
import { Input } from "@rebass/forms";
import * as uiText from "../../text";
import { useState } from "react";

const QuestionCreator = () => {

    const [text, setText] = useState("");

    const onCreateQuestion = async () => {

        //TODO: implement
    }

    return <Flex py={[1, 2, 3]}>
        <Box width={1 / 3} />
        <Box as='form' onSubmit={e => e.preventDefault()} width={2 / 4}>

            <Flex>
                <Input
                    aria-label="questionname-input"
                    placeholder={uiText.settings.questions.placeholder}
                    onChange={({ target: { value } }) => {
                        setText(value);
                    }}
                    value={text}
                />
                <Button
                    onClick={onCreateQuestion}
                    aria-label={"create-button"}
                >
                    {uiText.settings.questions.createButton}
                </Button>
            </Flex>

        </Box>
        <Box width={1 / 3} />
    </Flex>
}

/**
 * SHould provide functionality for: 
 * * create questions for the page (max 3?)
 * * update questions for the page 
 * * delete questions for the page (??) -> THINKABOUT: how to handle answers for deleted questions? 
 */
export const ManageQuestions = () => {


    return <>
        <Heading>{uiText.settings.questions.heading}</Heading>
        <QuestionCreator />
    </>

}
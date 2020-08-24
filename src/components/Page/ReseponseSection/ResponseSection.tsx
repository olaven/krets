import { useContext, useState } from "react";
import { Box, Button, Flex, Heading } from "rebass"
import { KretsEmoji } from "../../tiny/emoji";
import { CREATED } from "node-kall";
import { AnswerModel, Emotion } from "../../../models/models";
import * as uiText from "../../../text";
import { postAnswer, postResponse } from "../../../fetchers";
import { Thanks } from "../../tiny/Thanks";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { CustomQuestions, DefaultQuestion } from "./Questions";
import { ContactInput } from "./ContactInput";



export const ResponseSection = ({ page }) => {

    const { questions } = useContext(QuestionsContext);

    const [published, setPublished] = useState(false);
    const [emotion, setEmotion] = useState<Emotion>(null);
    const [answers, setAnswers] = useState<AnswerModel[]>([]);
    const [contactDetails, setContactDetails] = useState("");

    const RenderedQuestions = () => questions.length <= 0 ?

        <DefaultQuestion
            setAnswers={setAnswers}
            emotion={emotion} /> :
        <CustomQuestions
            answers={answers}
            setAnswers={setAnswers}
            questions={questions}
        />



    const onPostResponse = async () => {

        //NOTE:impossible with current implementation, as button is hidden if no emotion is selected
        if (!emotion) {
            alert(uiText.response.chooseSmiley);
            return;
        }

        const [status, response] = await postResponse({
            emotion,
            page_id: page.id,
            contact_details: contactDetails ? contactDetails : null
        });

        if (status === CREATED) {

            //FIXME: currently only one answer possible 
            const answers = [{ text, response_id: response.id }]
            await Promise.all(answers.map(answer =>
                postAnswer(page.id, answer)
            ));

            //FIXME: succsess regardless of wether answers were acepted or not
            setPublished(true);
        } else {

            alert(uiText.response.error);
        }
    };


    return <Box m={"auto"} py={[4, 8, 16]}>
        {published ?
            <Thanks /> :
            <>
                <Heading textAlign={"center"} aria-label="response-section-header" py={[1, 2, 3]} color={"primary"}>{uiText.response.header} {page.name}</Heading>
                <Flex>
                    <KretsEmoji type={":-)"} emotion={emotion} setEmotion={setEmotion} />
                    <KretsEmoji type={":-|"} emotion={emotion} setEmotion={setEmotion} />
                    <KretsEmoji type={":-("} emotion={emotion} setEmotion={setEmotion} />
                </Flex>
                {emotion && <>
                    <RenderedQuestions />
                    <ContactInput
                        setContactDetails={setContactDetails} />
                    <Button
                        aria-label="response-button-input"
                        width={1}
                        m={1}
                        px={3}
                        onClick={onPostResponse}>
                        {uiText.response.button}
                    </Button>
                </>}
            </>}
    </Box>;
};
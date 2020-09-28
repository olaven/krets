import { useContext, useState } from "react";
import { Box, Button, Flex, Heading } from "rebass"
import { KretsEmoji } from "../../tiny/emoji";
import { CREATED, filterStatus } from "node-kall";
import { AnswerModel, Emotion, PageModel } from "../../../models/models";
import * as uiText from "../../../text";
import { postAnswer, postResponse, putEmbeddableResponse } from "../../../fetchers";
import { Thanks } from "../../tiny/Thanks";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { CustomQuestions, DefaultQuestion } from "./Questions";
import { ContactInput } from "./ContactInput";



export const ResponseSection = ({ page, showHeader, embeddable }: {
    page: PageModel, showHeader: boolean, embeddable: {
        active: boolean, token?: string
    }
}) => {

    const { questions } = useContext(QuestionsContext);

    const [answers, setAnswers] = useState(new Map<string, AnswerModel>());//NOTE: not sure if this has to be kep
    const [published, setPublished] = useState(false);
    const [emotion, setEmotion] = useState<Emotion>(null);
    const [contactDetails, setContactDetails] = useState("");

    const onPostResponse = async () => {

        //NOTE:impossible with current implementation, as button is hidden if no emotion is selected
        if (!emotion) {
            alert(uiText.response.chooseSmiley);
            return;
        }

        await (embeddable.active ?
            postEmbeddable() :
            postStandard());
    };

    const postEmbeddable = async () => {

        const [status] = await putEmbeddableResponse({
            token: embeddable.token,
            response: {
                emotion,
                page_id: page.id,
                contact_details: contactDetails ? contactDetails : null
            },
            answers: Array.from(answers.values())
        });

        console.log("posting", status)
        if (status === CREATED) {

            setPublished(true);
        } else {

            alert(uiText.response.error);
        }
    }
    const postStandard = async () => {

        const [status, response] = await postResponse({
            emotion,
            page_id: page.id,
            contact_details: contactDetails ? contactDetails : null
        });

        if (status === CREATED) {

            await Promise.all(
                Array.from(answers.values()).map(answer =>
                    filterStatus(
                        postAnswer(page.id, response.id, answer)
                    )
                )
            );

            //FIXME: succsess regardless of wether answers were acepted or not
            // -> Easier if #279 is implemented:)
            setPublished(true);
        } else {

            alert(uiText.response.error);
        }
    }


    const headerText = page.custom_title ?
        page.custom_title :
        `${uiText.response.header} ${page.name}`

    return <Box m={"auto"} py={[4, 8, 16]}>
        {published ?
            <Thanks /> :
            <>
                {showHeader && <Heading textAlign={"center"} aria-label="response-section-header" py={[1, 2, 3]} color={"primary"}>{headerText}</Heading>}
                <Flex>
                    <KretsEmoji type={":-)"} emotion={emotion} setEmotion={setEmotion} />
                    <KretsEmoji type={":-|"} emotion={emotion} setEmotion={setEmotion} />
                    <KretsEmoji type={":-("} emotion={emotion} setEmotion={setEmotion} />
                </Flex>
                {emotion && <>
                    {questions.length === 0 ?
                        <DefaultQuestion
                            answers={answers}
                            emotion={emotion}
                            setAnswers={setAnswers} /> :
                        <CustomQuestions
                            answers={answers}
                            questions={questions}
                            setAnswers={setAnswers}
                        />
                    }
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
            </>
        }
    </Box >;
};
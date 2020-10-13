import { useContext, useState } from "react";
import { Box, } from "rebass";
import { CREATED, filterStatus } from "node-kall";
import { AnswerModel, Emotion, PageModel } from "../../../models/models";
import * as uiText from "../../../text";
import { postAnswer, postResponse, putEmbeddableResponse } from "../../../fetchers";
import { Thanks } from "../../standard/Thanks";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { Questions } from "./Questions";
import { ContactInput } from "./ContactInput";
import { Emojis } from "./Emojis";
import { css, styled } from "../../../stiches.config";
import { Heading } from "../../standard/Heading";
import { ArrowButton, Button } from "../../standard/Button";
import { Checkbox } from "../../standard/Checkbox";



const OuterContainer = styled("div", {
    position: "absolute",
    transform: "translateX(-50%)",

    large: {
        width: "80vw",
    },
    small: {
        width: "100vw",
    }
})

const InputContainer = styled('div', {
    marginTop: "100px",
    animationName: `${css.keyframes({
        "0%": {
            opacity: "0",
            transform: "translateY(10%)",
        },
        "100%": {
            opacity: "1",
            transform: "translateY(0)",
        }
    })}`,
    animationDuration: "280ms",
    animationTimingFunction: "ease",
});

export const ResponseSection = ({ page, showHeader, embeddable }: {
    page: PageModel, showHeader: boolean, embeddable: {
        active: boolean, token?: string
    }
}) => {

    const { questions } = useContext(QuestionsContext);

    const [answers, setAnswers] = useState(new Map<string, AnswerModel>());
    const [published, setPublished] = useState(false);
    const [emotion, setEmotion] = useState<Emotion>(null);
    const [contactDetails, setContactDetails] = useState("");
    const [showContactDetailsError, setShowContactDetailsError] = useState(false);
    const [showContactStep, setShowQuestions] = useState(false)

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

        if (status === CREATED) {

            setPublished(true);
        } else {

            alert(uiText.response.error);
        }
    }

    const postStandard = async () => {
        if (page.mandatory_contact_details && !contactDetails) {

            setShowContactDetailsError(true);
            return;
        }

        const [status, response] = await postResponse({
            emotion,
            page_id: page.id,
            contact_details: contactDetails ? contactDetails : null
        });

        if (status === CREATED) {

            const status = await Promise.all(
                Array
                    .from(answers.values())
                    .map(answer =>
                        filterStatus(
                            postAnswer(page.id, response.id, answer)
                        )
                    )
            );

            console.log(status);
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


    return <Box py={[4, 8, 16]} m="auto">
        {
            published ?
                <Thanks /> :
                <OuterContainer>

                    {showHeader && <Heading aria-label="response-section-header">{headerText}</Heading>}
                    <Emojis
                        selectedEmotion={emotion}
                        setSelectedEmotion={setEmotion}
                    />

                    {emotion && !showContactStep &&
                        <InputContainer>
                            <Questions
                                answers={answers}
                                setAnswers={setAnswers}
                                emotion={emotion} />

                            <ArrowButton
                                aria-label="response-button-input"
                                onClick={() => setShowQuestions(true)}
                            />
                        </InputContainer>
                    }
                    {emotion && showContactStep &&
                        <InputContainer>
                            <ContactInput
                                isMandatory={page.mandatory_contact_details}
                                setContactDetails={setContactDetails}
                                showContactDetailsError={showContactDetailsError} />
                        </InputContainer>
                    }
                </OuterContainer >
        }
    </Box >;
};
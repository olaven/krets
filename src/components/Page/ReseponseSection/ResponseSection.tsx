import { useState } from "react";
import { CREATED } from "node-kall";
import { AnswerModel, Emotion, PageModel } from "../../../models/models";
import * as uiText from "../../../text";
import { postResponse, putEmbeddableResponse } from "../../../fetchers";
import { Thanks } from "../../standard/Thanks";
import { Questions } from "./Questions";
import { ContactInput } from "./ContactInput";
import { Emojis } from "./Emojis";
import { css, styled } from "../../../stiches.config";
import { H1 } from "../../standard/Heading";
import { ArrowButton, Button } from "../../standard/Button";


const OuterContainer = styled("div", {

    width: "100vw",
    left: "0",
    right: "0",
    marginLeft: "auto",
    marginRight: "auto",

    display: "flex",
    flexDirection: "column",

    large: {
        width: "80vw",
    },
    small: {
        width: "100vw",
    }
})

const InputContainer = styled('div', {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

const SendButton = styled(Button, {
    transition: "ease .5s",
    fontSize: "34px",
    marginTop: "21px",
    padding: "21px",
    width: "20vw",

    small: {
        width: "90vw",
    },

    opacity: 0,
    transform: "translateY(10%)",

    variants: {
        visible: {
            true: {
                opacity: 1,
                transform: "translateY(0%)"
            },
        }
    }
})

export const ResponseSection = ({ page, showHeader, embeddable }: {
    page: PageModel, showHeader: boolean, embeddable: {
        active: boolean, token?: string
    }
}) => {

    const [answers, setAnswers] = useState(new Map<string, AnswerModel>());
    const [published, setPublished] = useState(false);
    const [emotion, setEmotion] = useState<Emotion>(null);
    const [contactDetails, setContactDetails] = useState("");
    const [showSendButton, setShowSendButton] = useState(false);
    const [showContactDetailsError, setShowContactDetailsError] = useState(false);
    const [showContactStep, setShowQuestions] = useState(false)

    const onPostResponse = async () => {

        if (page.mandatory_contact_details && !contactDetails) {

            setShowContactDetailsError(true);
            return;
        }

        //NOTE:impossible with current implementation, as button is hidden if no emotion is selected
        if (!emotion) {
            alert(uiText.response.chooseSmiley);
            return;
        }

        await (embeddable.active ?
            postEmbeddable() :
            postStandard());
    };

    //TODO: make more similar to postStandard. Ideally, combine somehwo 
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

        const [status] = await postResponse({
            response: {
                emotion,
                page_id: page.id,
                contact_details: contactDetails ? contactDetails : null
            },
            answers: Array.from(answers.entries()).map(([questionId, answer]) => ({
                ...answer,
                question_id: questionId === 'DEFAULT' ? null : questionId
            }))
        });

        if (status === CREATED) setPublished(true);
        else alert(uiText.response.error);

    }


    return published ?
        <Thanks /> :
        <OuterContainer>

            {showHeader && <H1 aria-label="response-section-header">{
                page.custom_title ?
                    page.custom_title :
                    `${uiText.response.header} ${page.name}`
            }</H1>}

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
                        setShowSendButton={setShowSendButton}
                        setContactDetails={setContactDetails}
                        showContactDetailsError={showContactDetailsError} />
                    <SendButton
                        //@ts-ignore
                        visible={(showSendButton || page.mandatory_contact_details)}
                        onClick={onPostResponse}>
                        {uiText.response.button}
                    </SendButton>
                </InputContainer>
            }
        </OuterContainer >

};
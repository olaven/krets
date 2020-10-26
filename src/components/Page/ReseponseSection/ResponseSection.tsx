import { useState } from "react";
import { CREATED } from "node-kall";
import { AnswerModel, Emotion, PageModel } from "../../../models/models";
import * as uiText from "../../../text";
import { postResponse } from "../../../fetchers";
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

export const ResponseSection = ({ page }: {
    page: PageModel
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
    };


    return published ?
        <Thanks /> :
        <OuterContainer>

            <H1 aria-label="response-section-header">{
                page.custom_title ?
                    page.custom_title :
                    `${uiText.response.header} ${page.name}`
            }</H1>

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

                    <div>
                        <ArrowButton
                            circular
                            size={79}
                            aria-label="response-button-input"
                            onClick={() => setShowQuestions(true)}
                        />
                    </div>
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
import { useContext, useState } from "react";
import { Box, } from "rebass";
import { CREATED, filterStatus } from "node-kall";
import { AnswerModel, Emotion, PageModel } from "../../../models/models";
import * as uiText from "../../../text";
import { postAnswer, postResponse, putEmbeddableResponse } from "../../../fetchers";
import { Thanks } from "../../tiny/Thanks";
import { QuestionsContext } from "../../../context/QuestionsContext";
import { CustomQuestions, DefaultQuestion } from "./Questions";
import { ContactInput } from "./ContactInput";
import { Emojis } from "./Emojis";
import { css, styled } from "../../../stiches.config";


const Button = styled('button', {
    border: "none",
    color: "$secondary",
    backgroundColor: "$primary",
    cursor: "pointer",
    padding: "$8",
    borderRadius: "5px",
    fontSize: "$21",

    ":hover": {
        transitionDuration: "50ms",
        backgroundColor: "$secondary",
        color: "$primary",
        underlineColor: "$primary",
        textDecoration: "underline",
        borderWidth: "1px",
        borderColor: "$black",
    },


    variants: {
        shape: {
            circular: {
                display: "block",
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                padding: "0px",
                textAlign: "center",
            }
        },
        width: {
            full: {

                large: {
                    width: "80%",
                },
                small: {
                    width: "100%"
                }
            }
        }
    }
});


//TODO: move to common standard file for headings and reuse 
const Heading = styled('h1', {
    color: '$dark',
    fontWeight: "lighter",
    textAlign: "center"
});


//TODO: move to common standard file for checkboxes and reuse 
const Checkbox = () => {

    const Input = styled("input", {
        transform: "scale(300%)",
        backgroundColor: "$secondary",
        color: "$primary",
        opacity: 0,

        "&:checked + label": {
            backgroundColor: "$primary",
            color: "$secondary",

            svg: {
                stroke: "$secondary",
                fontSize: "3em",
            }
        }
    });

    const Label = styled('label', {
        borderColor: "$primary",
        backgroundColor: "$secondary",
        borderStyle: "solid",

        position: "absolute",
        width: "50px",
        height: "50px",

        cursor: "pointer",
        ":hover": {
            transitionDuration: "100ms",
            transitionTimingFunction: "linear",
            transform: "scale(1.1)"
        },

        svg: {
            transitionDuration: "200ms",
            transitionTimingFunction: "ease-out",
            stroke: "$primary",

            ":hover": {
                transitionDuration: "20ms",
                transitionTimingFunction: "ease-in-out",
                transform: "scale(1.05)"
            }
        }
    });


    return <>
        <Input type="checkbox" id="checkbox" />
        <Label for="checkbox">
            <svg
                viewBox="0 -2 24 24"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </Label>
    </>
}

const TextInput = styled("input", {
    padding: "$5",
    margin: "$5 0",
    borderRadius: "5px",
    border: "2px solid #c6c6c6",
    fontSize: "$21",
    ":focus": {
        outline: "none"
    }
})

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

    const [answers, setAnswers] = useState(new Map<string, AnswerModel>());//NOTE: not sure if this has to be kep
    const [published, setPublished] = useState(false);
    const [emotion, setEmotion] = useState<Emotion>(null);
    const [contactDetails, setContactDetails] = useState("");
    const [showContactDetailsError, setShowContactDetailsError] = useState(false);

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

                    {emotion && <InputContainer>
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
                            isMandatory={page.mandatory_contact_details}
                            setContactDetails={setContactDetails}
                            showContactDetailsError={showContactDetailsError} />

                        <Button
                            aria-label="response-button-input"
                            onClick={onPostResponse}
                            width="full"
                        >
                            {uiText.response.button}
                        </Button>

                    </InputContainer>}
                </OuterContainer >
        }
    </Box >;
};
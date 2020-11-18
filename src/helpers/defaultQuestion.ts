import * as uiText from "./text";
import { Emotion } from "../models/models";

const getDefaultPlaceholder = (emotion: Emotion) => ({
    ":-)": uiText.response.placeholder.happy,
    ":-|": uiText.response.placeholder.neutral,
    ":-(": uiText.response.placeholder.sad,
}[emotion]);


export const defaultQuestion = (emotion: Emotion) => ({
    id: null,
    text: getDefaultPlaceholder(emotion), //NOTE: This is the question question that will be asked if no custom questions are defined
    page_id: null,
    archived: false,
});
import { Emotion } from "./Emotion";

//TODO: move to `./models.ts` if works
export interface SummaryModel {
    page_name: string,
    emotion: Emotion
    question_text: string,
    answer_text: string,
    contact_details: string
}
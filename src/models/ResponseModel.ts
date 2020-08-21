import { Emotion } from "./Emotion";

export interface ResponseModel {
    id?: string,
    emotion: Emotion,
    //   text: string, //NOTE: replaced with AnswerModel
    page_id: string,
    contact_details?: string,
    created_at?: string,
}
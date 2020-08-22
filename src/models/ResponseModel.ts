import { Emotion } from "./Emotion";

export interface ResponseModel {
    id?: string,
    emotion: Emotion,
    page_id: string,
    contact_details?: string,
    created_at?: string,
}
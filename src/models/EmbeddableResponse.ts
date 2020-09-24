import { AnswerModel } from "./AnswerModel";
import { ResponseModel } from "./ResponseModel";

/**
 * Describing the body that is sent 
 * when submitting a response from 
 * an `Embeddable`
 */
export interface EmbeddableResponseModel {
    token: string,
    response: ResponseModel,
    answers: AnswerModel[]
}
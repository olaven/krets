import { AnswerModel, ResponseModel } from "./models";

/**
 * Combines `ResponseModel` and `AnswerModel`. 
 * Handy for posting of responses and answers 
 */
export interface ResponseAnswerModel {
    response: ResponseModel,
    answers: AnswerModel[],
}
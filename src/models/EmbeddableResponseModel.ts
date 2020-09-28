import { AnswerModel } from "./AnswerModel";
import { EmbeddableModel } from "./EmbeddableModel";
import { ResponseModel } from "./ResponseModel";

export interface EmbeddableResponseModel {
    token: string,
    response: ResponseModel
    answers: AnswerModel[]
}
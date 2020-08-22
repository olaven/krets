import { AnswerModel } from "../models/models"
import { first, rows } from "./helpers/query"

const createAnswer = (answer: AnswerModel) =>
    first<AnswerModel>(
        'insert into answers (response_id, text) values ($1, $2) returning *',
        [answer.response_id, answer.text]
    );

const getByResponse = (responseId: string) =>
    rows<AnswerModel>(
        `select * from answers where response_id = $1`,
        [responseId]
    );

export const answers = {
    createAnswer,
    getByResponse
}
import { AnswerModel } from "../models/models"
import { first, rows } from "./helpers/query"

const getAnswer = (id: number) =>
    first<AnswerModel>(
        `select * from answers where id = $1`,
        [id]
    );

const createAnswer = (answer: AnswerModel) =>
    first<AnswerModel>(
        'insert into answers (response_id, text, question_id) values ($1, $2, $3) returning *',
        [answer.response_id, answer.text, answer.question_id]
    );

const getByResponse = (responseId: string) =>
    rows<AnswerModel>(
        `select * from answers where response_id = $1 order by created_at asc`,
        [responseId]
    );

export const answers = {
    getAnswer,
    createAnswer,
    getByResponse
}
import { QuestionModel } from "../models/models"
import { first, rows, run } from "./helpers/query"


const getQuestion = (id: string) =>
    first<QuestionModel>(
        `select * from questions where id = $1`,
        [id]
    );

const getByPage = (pageId: string) =>
    rows<QuestionModel>(
        `select * from questions where page_id = $1`,
        [pageId]
    );

const createQuestion = (question: QuestionModel) =>
    first<QuestionModel>(
        `insert into questions (page_id, text) values ($1, $2) returning *`,
        [question.page_id, question.text]
    );

const updateQuestion = (question: QuestionModel) =>
    run(
        `update questions set text = $2 where id = $1`,
        [question.id, question.text]
    )

export const questions = {
    getQuestion,
    getByPage,
    createQuestion,
    updateQuestion
}
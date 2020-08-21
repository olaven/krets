import { QuestionModel } from "../models/models"
import { first, rows } from "./helpers/query"


const createQuestion = (question: QuestionModel) =>
    first<QuestionModel>(
        `insert into questions (page_id, text) values ($1, $2) returning *`,
        [question.page_id, question.text]
    )

const getByPage = (pageId: string) =>
    rows<QuestionModel>(
        `select * from questions where page_id = $1`,
        [pageId]
    );

export const questions = {
    getByPage,
    createQuestion
}
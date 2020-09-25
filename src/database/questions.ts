import { QuestionModel } from "../models/models"
import { first, rows, run } from "./helpers/query"


const getQuestion = (id: string) =>
    first<QuestionModel>(
        `select * from questions where id = $1`,
        [id]
    );

//NOTE: returns both archived- and non-archived questions 
const getByPage = (pageId: string) =>
    rows<QuestionModel>(
        `select * from questions where page_id = $1 order by created_at desc`,
        [pageId]
    );

const getNonArchivedByPage = (pageId: string) =>
    rows<QuestionModel>(
        `select * from questions where page_id = $1 and archived = false order by created_at desc`,
        [pageId]
    );

const createQuestion = (question: QuestionModel) =>
    first<QuestionModel>(
        `insert into questions (page_id, text, archived) values ($1, $2, $3) returning *`,
        [question.page_id, question.text, question.archived]
    );

const updateQuestion = (question: QuestionModel) =>
    run(
        `update questions set text = $2, archived = $3 where id = $1`,
        [question.id, question.text, question.archived]
    )

const deleteQuestion = (id: string) =>
    first<QuestionModel>(
        `delete from questions where id = $1 returning *`,
        [id]
    )

export const questions = {
    getQuestion,
    getByPage,
    getNonArchivedByPage,
    createQuestion,
    updateQuestion,
    deleteQuestion,
}
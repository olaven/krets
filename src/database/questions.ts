import { QuestionModel } from "../models/models"
import { first, rows, run } from "./helpers/query"


const getQuestion = (id: string) =>
    first<QuestionModel>(
        `select * from questions where id = $1`,
        [id]
    );

/**
 * Returns all questions related to the given page.
 * NOTE: Returns all questions, regardless of `archived`-status
 * @param pageId 
 */
const getByPage = (pageId: string) =>
    rows<QuestionModel>(
        `select * from questions where page_id = $1 order by display_order asc`,
        [pageId]
    );

/**
 * Returns questions that are not archived and 
 * related to the giving page. 
 * @param pageId 
 */
const getNonArchivedByPage = (pageId: string) =>
    rows<QuestionModel>(
        `select * from questions where page_id = $1 and archived = false order by display_order asc`,
        [pageId]
    );

const createQuestion = (question: QuestionModel) =>
    first<QuestionModel>(
        `insert into questions (page_id, text, archived) values ($1, $2, $3) returning *`,
        [question.page_id, question.text, question.archived]
    );

const updateQuestion = (question: QuestionModel) =>
    run(
        `update questions set text = $2, archived = $3, display_order = $4 where id = $1`,
        [question.id, question.text, question.archived, question.display_order]
    );

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
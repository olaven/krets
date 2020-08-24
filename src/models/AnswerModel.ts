export interface AnswerModel {
    id?: number,
    response_id?: string, //NOTE: required in database, assigned in backend
    text: string
    question_id?: string,
}
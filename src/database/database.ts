//FIXME: hack while experimenting with `export const datbase`
import { pages as _pages } from "./pages";
import { responses as _responses } from "./responses";
import { users as _users } from "./users";
import { categories as _categories } from "./categories";
import { answers as _answers } from "./answers";
import { questions as _questions } from "./questions";
import { embeddables as _embeddables } from "./embeddables"


export const pages = _pages
export const responses = _responses
export const users = _users
export const categories = _categories
export const answers = _answers
export const questions = _questions
export const embeddables = _embeddables


export const database = {
    pages: _pages,
    responses: _responses,
    users: _users,
    categories: _categories,
    answers: _answers,
    questions: _questions,
    embeddables: _embeddables,
}
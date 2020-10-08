import { AnswerModel, PageModel, ResponseModel } from "../models/models";
import { rows } from "./helpers/query";

//TODO: move to `./models.ts` if works
interface SummaryModel {
    page: PageModel,
    responses: ResponseModel[],
    answers: AnswerModel[],
}

export const getSummaryData = (userId: string) => rows<SummaryModel[]>(
    `
        
    `,
    [userId]
)
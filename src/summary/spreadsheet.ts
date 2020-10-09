
/* import { database } from "../database/database";
import { UserModel } from "../models/models";


export const allResponseData = async (user: UserModel) => Promise.all(
    (await Promise.all(
        (await database.pages.getByOwner(user.id))
            .map(async page => ({
                page,
                responses: await database.responses.getResponses(page.id)
            }))
    )).map(({ page, responses }) => ({

        page,
        responses,
        answers: responses.map(response =>
            database.answers.getByResponse(response.id)
        )
    }))
);
 */

import { database } from "../database/database"
import { SummaryModel, UserModel } from "../models/models";
import { convertToSheet, convertToWorkbook, writeToFile } from "./sheetjs";


export const generateSummarySheet = (summaries: SummaryModel[]) =>
    writeToFile(
        convertToWorkbook(
            summaries.map(summary => ({
                name: summary.page_name,
                sheet: convertToSheet<SummaryModel>([summary])
            }))
        )
    );

const generateFromDatabase = async (user: UserModel) => {

    const sheets = generateSummarySheet(
        await database.summary.get(user.id)
    );

    return sheets;
}
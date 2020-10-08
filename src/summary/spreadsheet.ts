
import { database } from "../database/database";
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

const generateSummarySheet = async (user: UserModel) => {

    (await allResponseData(user))
        .map(({ page, responses, answers }) => {


        });

}
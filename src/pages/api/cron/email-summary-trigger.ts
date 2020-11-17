import { FORBIDDEN, NOT_IMPLEMENTED } from "node-kall";
import { database } from "../../../database/database";
import { date } from "../../../date";
import { withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";
import { PageModel, UserModel } from "../../../models/models";

const lastSevenDays = (page: PageModel) =>
    database.responses.getAfter(
        page.id,
        date().last(7).days()
    )

const getContent = async (owner: UserModel) => {

    //FIXME: FUGLY 
    (await Promise.all(
        (await database.pages.getByOwner(owner.id))
            .map(async page => ({
                page,
                responses: await lastSevenDays(page)
            }))
    )).map(async ({ page, responses }) => ({
        page,
        responses,
        answers: await Promise.all(responses.map(async response => await database.answers.getByResponse(response.id)))
    }));

    //TODO: convert object retrieved above to some email data or something.
}

export default withErrorHandling(
    withMethodHandlers({
        GET: (request, response) => {

            const expected = process.env.EMAIL_SUMMARY_SECRET;
            const actual = request.headers["x-krets-email-summary-secret"];

            if (actual !== expected) {
                return response.status(FORBIDDEN).end();
            }

            return response.status(NOT_IMPLEMENTED).end();
        }
    })
)
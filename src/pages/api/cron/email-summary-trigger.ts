import { FORBIDDEN, ACCEPTED } from "node-kall";
import { asyncForEach } from "../../../asyncForEach";
import { database } from "../../../database/database";
import { date } from "../../../date";
import { withErrorHandling, withMethodHandlers } from "../../../middleware/middleware";
import { PageModel, } from "../../../models/models";

const lastSevenDays = (page: PageModel) =>
    database.responses.getAfter(
        page.id,
        date().last(7).days()
    )


//FIXME: FUGLY
const triggerEmailSummary = async () => {

    const users = await database.users.getActive();
    //NOTE: Should NOT await for every user? (only inner)
    await asyncForEach(users, async user => {

        const pages = await database.pages.getByOwner(user.id);
        await asyncForEach(pages, async page => {

            const responses = await lastSevenDays(page);
            await asyncForEach(responses, async response => {

                const answers = await database.answers.getByResponse(response.id);
            });
        });
    });
}

export default withErrorHandling(
    withMethodHandlers({
        GET: async (request, response) => {

            const expected = process.env.EMAIL_SUMMARY_SECRET;
            const actual = request.headers["x-krets-email-summary-secret"];

            if (actual !== expected) {
                return response.status(FORBIDDEN).end();
            }

            triggerEmailSummary();

            return response.status(ACCEPTED).end();
        }
    })
)
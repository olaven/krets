import { NOT_FOUND } from "node-kall";
import { database } from "../../../../../database/database";
import { withCors, withErrorHandling, withMethodHandlers } from "../../../../../middleware/middleware"
import { EmbeddableInformationModel } from "../../../../../models/models";
import { getPathParam } from "../../../../../helpers/workarounds";


export default withCors(
    withErrorHandling(
        withMethodHandlers({
            GET: async (request, response) => {

                const pageId = getPathParam(request.url, 3);
                const token = request.query.token as string;

                const embeddable = await database.embeddables.getByToken(token);
                if (!embeddable || embeddable.page_id !== pageId)
                    return response
                        .status(NOT_FOUND)
                        .end()

                const questions = await database.questions.getNonArchivedByPage(embeddable.page_id);
                const page = await database.pages.get(pageId);

                const embeddableInformation: EmbeddableInformationModel = {
                    embeddable,
                    questions,
                    mandatoryContactDetails: page.mandatory_contact_details
                }

                response.json(embeddableInformation);
            }
        })
    ),
    "*"
);

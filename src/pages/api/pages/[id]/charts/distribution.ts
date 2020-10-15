import { database } from "../../../../../database/database";
import { getId, withChartMiddleware } from "./chartMiddleware";

export default withChartMiddleware(
    async (request, response) => {

        const pageId = getId(request.url)
        const distribution = await database.responses.getEmojiDistribution(pageId);

        response
            .json(distribution);
    }
);
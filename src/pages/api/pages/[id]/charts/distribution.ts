import { responses } from "../../../../../database/database";
import { getId, withChartMiddleware } from "./chartMiddleware";

export default withChartMiddleware(
    async (request, response) => {

        const pageId = getId(request.url)
        const distribution = await responses.getEmojiDistribution(pageId);

        response
            .json(distribution);
    }
);
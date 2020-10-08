import { withChartMiddleware, getId } from "./chartMiddleware";
import { responses } from '../../../../../database/database';


export default withChartMiddleware(async (request, response) => {

    //const id = request.query.id as string;
    const id = getId(request.url);
    const coordinates = await responses.getLineCoordinates(id);

    response
        .send(coordinates);
});
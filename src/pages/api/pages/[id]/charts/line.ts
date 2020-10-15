import { withChartMiddleware, getId } from "./chartMiddleware";
import { database } from '../../../../../database/database';


export default withChartMiddleware(async (request, response) => {

    //const id = request.query.id as string;
    const id = getId(request.url);
    const coordinates = await database.responses.getLineCoordinates(id);

    response
        .send(coordinates);
});
import {NextApiRequest, NextApiResponse} from "next";
import TypeormConnection from "../../../../server/TypeormConnection";
import {ResponseEntity} from "../../../../server/entities/ResponseEntity";

export default function responsesForBrandInURL(request: NextApiRequest, response: NextApiResponse) {

    const repository = TypeormConnection.connection.getRepository(ResponseEntity);
    const { id } = request.query;
    const responses = repository.createQueryBuilder("response")
        .where("response.brand.id = :id", { id });

    if (!responses) {

        response
            .status(404)
            .send("No repositories found.");
    } else {

        response
            .json(responses);
    }
}
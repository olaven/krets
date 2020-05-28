import {NextApiRequest, NextApiResponse} from "next";
import TypeormConnection from "../../../../server/TypeormConnection";
import {ResponseEntity} from "../../../../server/entities/ResponseEntity";
import {BrandEntity} from "../../../../server/entities/BrandEntity";

export default async function responsesForBrandInURL(request: NextApiRequest, response: NextApiResponse) {

    const { id } = request.query;

    const brandRepository = TypeormConnection.connection.getRepository(BrandEntity);
    const brand = await brandRepository.createQueryBuilder("brand")
        .where("brand.id = :id", { id })
        .getOne();

    if (!brand) {

        response
            .status(404)
            .send("No brand found");

        return;
    }

    const repository = TypeormConnection.connection.getRepository(ResponseEntity);
    const responses = await repository.createQueryBuilder("response")
        .where("response.brand.id = :id", { id })
        .getMany();

    response
        .json(responses);
}
import {NextApiRequest, NextApiResponse} from "next";
import DatabaseConnection from "../../../../server/DatabaseConnection";
import {ResponseEntity} from "../../../../server/entities/ResponseEntity";
import {BrandEntity} from "../../../../server/entities/BrandEntity";


//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 2];

};

export default async function responsesForBrandInURL(request: NextApiRequest, response: NextApiResponse) {

    const connection = await DatabaseConnection.get();
    const id = getId(request.url);

    const brandRepository = connection.getRepository(BrandEntity);
    const brand = await brandRepository.createQueryBuilder("brand")
        .where("brand.id = :id", { id })
        .getOne();

    if (!brand) {

        response
            .status(404)
            .send("No brand found");

        return;
    }

    const repository = connection.getRepository(ResponseEntity);

    const responses = await repository.createQueryBuilder("response")
        .where("response.brand.id = :id", { id })
        .getMany();

    response
        .json(responses);
}
import {NextApiRequest, NextApiResponse} from "next";
import TypeormConnection from "../../../server/TypeormConnection";
import {BrandEntity} from "../../../server/entities/BrandEntity";


export default async function specificBrand(request: NextApiRequest, response: NextApiResponse) {

    const { query: { id } } = request;
    console.log("typeormconnection", TypeormConnection.connection);
    const repository = TypeormConnection.connection.getRepository(BrandEntity);

    const brand = await repository.find({ where: {
        id
    }});

    if (brand) {

        response
            .json(brand);
    } else {

        response
            .status(404)
            .send("Could not find this brand..");
    }

}
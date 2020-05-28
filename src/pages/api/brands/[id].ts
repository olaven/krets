import {NextApiRequest, NextApiResponse} from "next";
import TypeormConnection from "../../../server/TypeormConnection";
import {BrandEntity} from "../../../server/entities/BrandEntity";


export default async function specificBrand(request: NextApiRequest, response: NextApiResponse) {

    const { id } = request.query;

    const repository = TypeormConnection.connection.getRepository(BrandEntity);

    //const all = await repository.findByIds([id]);
    //console.log("all: ", all);

    /*const brand = await repository.findOne({
        where: {
            id: id
        }
    });*/

    console.log("What am I querying for? ", id);
    const brand = await repository.createQueryBuilder("brand")
        .where("brand.id = :id", { id: id })
        .getOne();

    console.log("FOUND BRAND: ", brand);
    if (brand) {

        response
            .json(brand);
    } else {

        response
            .status(404)
            .send("Could not find this brand..");
    }

}
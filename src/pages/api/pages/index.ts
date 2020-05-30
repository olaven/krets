import auth0 from "../../../auth/auth0";
import {BrandEntity} from "../../../database/entities/BrandEntity";
import DatabaseConnection from "../../../database/DatabaseConnection";


export default auth0.requireAuthentication(async function brand (request, response) {

    const { user } = await auth0.getSession(request);
    const repository = (await DatabaseConnection.get()).getRepository(BrandEntity);

    if (request.method === "GET") {


        const brands = await repository.createQueryBuilder("brand")
            .innerJoin("brand.owner", "owner")
            .where("owner.id = :id", {id: user.sub})
            .getMany();
        /*const pages = await repository.find({
            relations: ["owner"],
            where: {
                owner: {
                    id:    user.sub
                }
            }
        });*/

        response
            .status(200)
            .json(brands);
    } else if (request.method === "POST") {

        //NOTE: automatically st brand owner
        const brand = await request.body;
        brand.owner = { id: user.sub}; // NOTE: seems like Typeorm translates brand.owner: User to .ownerID: string

        try {

            const result = await repository.save(brand);

            console.log("AFter save: ", result);
            response
                .status(201)
                .json(result)
        } catch (error) {

            console.log("PageId iwht error: ", brand);
            //TODO: different depending on error
            console.error("Erorr here: ", error);
            throw error
        }


    }
});


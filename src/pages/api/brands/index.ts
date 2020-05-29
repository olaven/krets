import auth0 from "../../../auth/auth0";
import {BrandEntity} from "../../../server/entities/BrandEntity";
import DatabaseConnection from "../../../server/DatabaseConnection";


export default auth0.requireAuthentication(async function brand (request, response) {

    const { user } = await auth0.getSession(request);
    const repository = (await DatabaseConnection.get()).getRepository(BrandEntity);

    if (request.method === "GET") {


        const brands = await repository.find({
            where: {
                ownerId: user.sub
            }
        });

        response
            .status(200)
            .json(brands);
    } else if (request.method === "POST") {

        //NOTE: automatically st brand owner
        const brand = await request.body;
        brand.ownerId = user.sub; // NOTE: seems like Typeorm translates brand.owner: User to .ownerID: string


        try {

            const result = await repository.save(brand);

            response
                .status(201)
                .json(result)
        } catch (error) {

            console.log("Brand iwht error: ", brand);
            //TODO: different depending on error
            console.error("Erorr here: ", error);
            throw error
        }


    }
});


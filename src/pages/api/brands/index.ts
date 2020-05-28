import auth0 from "../../../auth/auth0";
import {ResponseEntity} from "../../../server/entities/ResponseEntity"
import {BrandEntity} from "../../../server/entities/BrandEntity";
import TypeormConnection, {getPostgresConnection} from "../../../server/TypeormConnection";
import {getRepository, Repository} from "typeorm";
import {ISession} from "@auth0/nextjs-auth0/dist/session/session";


export default auth0.requireAuthentication(async function brand (request, response) {

    const { user } = await auth0.getSession(request);
    const repository = TypeormConnection.connection.getRepository(BrandEntity);

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


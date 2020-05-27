import auth0 from "../../auth/auth0";
import {ResponseEntity} from "../../server/entities/ResponseEntity"
import {BrandEntity} from "../../server/entities/BrandEntity";
import TypeormConnection, {getPostgresConnection} from "../../server/TypeormConnection";
import {getRepository, Repository} from "typeorm";
import {ISession} from "@auth0/nextjs-auth0/dist/session/session";


export default auth0.requireAuthentication(async function brand (request, response) {

    const { user } = await auth0.getSession(request);
    const repository = TypeormConnection.connection.getRepository(BrandEntity);

    if (request.method === "GET") {


        const brands = await repository.find({owner: user.sub});

        console.log("Finding brands for user: ", user.sub, brands);

        response
            .status(200)
            .json(brands);
    } else if (request.method === "POST") {

        //NOTE: automatically st brand owner
        const brand = await request.body;
        brand.ownerId = user.sub; // NOTE: seems like Typeorm translates brand.owner: User to .ownerID: string

        try {

            const result = await repository.save(brand);

            console.log("stored brand: ", result);

            response
                .status(201)
                .json(result)
        } catch (error) {

            //TODO: different depending on error
            throw error;
        }


    }
});


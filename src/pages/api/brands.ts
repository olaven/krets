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


        const brands = repository.find({owner: user.sub});

        response
            .status(200)
            .json(brands);
    } else if (request.method === "POST") {

        const brand = await request.body as BrandEntity;
        if (brand.owner !== user.sub) {

            response
                .status(403)
                .send("You are not allowed to post this response");
        }

        try {

            const result = await repository.save(brand);
            console.log("result data? ", result);
        } catch (error) {

            console.error("SOme error wihu", error);
            throw error;
        }


        response
            .status(201)
            .send("Not implemented")
    }
});


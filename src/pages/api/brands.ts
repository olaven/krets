import auth0 from "../../auth/auth0";
import {Response} from "../../server/entities/Response"
import {Brand} from "../../server/entities/Brand";
import TypeormConnection, {getPostgresConnection} from "../../server/TypeormConnection";
import {getRepository} from "typeorm";


export default auth0.requireAuthentication(async function brand (request, response) {

    const session = await auth0.getSession(request);

    if (request.method === "GET") {

        const { user } = session;

        //Altnertiatively just getCOnnection and think that conneciton is handled already

        const repository = TypeormConnection.connection.getRepository(Brand);

        const brands = repository.find({owner: user.sub});

        response
            .status(200)
            .json(brands);
    } else if (request.method === "POST") {

        response
            .status(501)
            .send("Not implemented")
    }
});


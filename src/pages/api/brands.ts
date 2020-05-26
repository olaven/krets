import auth0 from "../../auth/auth0";
import {Response} from "../../server/entity/Response"
import {Brand} from "../../server/entity/Brand";


export default auth0.requireAuthentication(async function brand (request, response) {

    const session = await auth0.getSession(request);

    if (request.method === "GET") {

        const { user } = session;
        //const brands = Brand.find({owner: user.id});

        const brands = [];
        response
            .status(200)
            .json(brands);
    } else if (request.method === "POST") {

        response
            .status(501)
            .send("Not implemented")
    }
});


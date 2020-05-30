import auth0 from "../../../auth/auth0";
import {connect} from "../../../database/Database";
import {repositories} from "../../../database/repository";


export default auth0.requireAuthentication(async function brand (request, response) {

    const { user } = await auth0.getSession(request);

    const repository = await (await repositories((await connect()))).page;

    if (request.method === "GET") {

        const pages = await repository.createQueryBuilder("page")
            .innerJoin("page.owner", "owner")
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
            .json(pages);
    } else if (request.method === "POST") {

        //NOTE: automatically st brand owner
        const page = await request.body;
        page.owner = { id: user.sub}; // NOTE: seems like Typeorm translates brand.owner: User to .ownerID: string

        try {

            const result = await repository.save(page);

            console.log("AFter save: ", result);
            response
                .status(201)
                .json(result)
        } catch (error) {

            console.log("PageId iwht error: ", page);
            //TODO: different depending on error
            console.error("Erorr here: ", error);
            throw error
        }


    }
});


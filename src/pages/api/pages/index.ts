import auth0 from "../../../auth/auth0";
import {pages} from "../../../database/pages";


export default auth0.requireAuthentication(async function brand (request, response) {

    const { user } = await auth0.getSession(request);

    if (request.method === "GET") {

        const pagesInDatabase = await pages.getByOwner(user.sub);
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
            .json(pagesInDatabase);
    } else if (request.method === "POST") {

        //NOTE: automatically st brand owner
        const page = await request.body;
        page.owner = { id: user.sub}; // NOTE: seems like Typeorm translates brand.owner: User to .ownerID: string

        try {

            const result = await pages.createPage(page);


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


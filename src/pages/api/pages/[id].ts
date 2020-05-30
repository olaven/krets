import {connect} from "../../../database/Database";
import {repositories} from "../../../database/repository";


//TODO: placeholder because query does not work in jest test (node env) https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    const id = split[split.length - 1];
    return id;
};

export default async function pageHandler(request, response) {

    const id = getId(request.url);
    const repository = await (await repositories((await connect()))).page;


    console.log("What am I querying for? ", id);
    const brand = await repository.createQueryBuilder("page")
        .where("page.id = :id", { id: id })
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
import {NextApiRequest, NextApiResponse} from "next";
import {connect} from "../../../../database/Database";
import {repositories} from "../../../../database/repository";


//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 2];

};

export default async function responsesForBrandInURL(request: NextApiRequest, response: NextApiResponse) {

    const repositores = (await repositories((await connect())));

    const id = getId(request.url);

    const brandRepository = await repositores.page;
    const brand = await brandRepository.createQueryBuilder("page")
        .where("page.id = :id", { id })
        .getOne();

    if (!brand) {

        response
            .status(404)
            .send("No brand found");

        return;
    }

    const repository = await repositores.response;

    const responses = await repository.createQueryBuilder("response")
        .where("response.brand.id = :id", { id })
        .getMany();

    response
        .json(responses);
}
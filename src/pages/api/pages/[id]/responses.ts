import {NextApiRequest, NextApiResponse} from "next";
import {connect, fetchTest} from "../../../../database/Database";
import {repositories} from "../../../../database/repository";


//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 2];

};

export default async function responsesForBrandInURL(request: NextApiRequest, response: NextApiResponse) {

    const responses = await fetchTest();
    console.log("Got results: ", responses);
    response.json(responses);

    /*const repositores = (await repositories((await connect())));

    const id = getId(request.url);

    const pageRepository = await repositores.page;
    const page = await pageRepository.createQueryBuilder("page")
        .where("page.id = :id", { id })
        .getOne();

    if (!page) {

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
        .json(responses);*/
}
import { OK } from "node-kall";
//import { useRouter } from "next/router"; //TODO: use this once workaround not needed
import auth0 from "../../../../../auth0";
import { responses } from "../../../../database/responses";

//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 2];

};

export default auth0.requireAuthentication(async function average(request, response) {

    const id = getId(request.url)
    const average = await responses.getAverageEmotionByPage(id);

    response
        .status(OK)
        .send(average)
});


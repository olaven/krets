import { OK } from "node-kall";
//import { useRouter } from "next/router"; //TODO: use this once workaround not needed
import { pages } from "../../../../database/pages";
import auth0 from "../../../../../auth0";

//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 2];

};

export default auth0.requireAuthentication(async function average(request, response) {

    console.log("in average")
    const id = getId(request.url)
    console.log("Her er jeg", id);
    const average = await pages.getAverage(id);
    console.log("Her er jeg igjen", average);

    response
        .status(OK)
        .send(average)
});


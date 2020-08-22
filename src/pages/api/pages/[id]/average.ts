import { OK } from "node-kall";
//import { useRouter } from "next/router"; //TODO: use this once workaround not needed
import { responses } from "../../../../database/database";
import { withAuthentication, withCors, withMethods } from "../../../../middleware/middleware";

//NOTE: workaround while request.query does not work in tests https://github.com/vercel/next.js/issues/13505
export const getId = (url: string) => {

    const split = url.split("/");
    return split[split.length - 2];

};

export default withCors(
    withAuthentication(
        withMethods(["GET"])(async function average(request, response) {

            const id = getId(request.url)
            const average = await responses.getAverageEmotionByPage(id);

            response
                .status(OK)
                .send(average)
        })
    )
);


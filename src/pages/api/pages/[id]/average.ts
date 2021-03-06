import { OK } from "node-kall";
//import { useRouter } from "next/router"; //TODO: use this once workaround not needed
import { database } from "../../../../database/database";
import { withAuthentication, withCors, withMethods } from "../../../../middleware/middleware";
import { getPathParam } from "../../../../helpers/workarounds";

const getId = (url: string) => getPathParam(url, 2);

export default withCors(
    withAuthentication(
        withMethods(["GET"])(async function average(request, response) {

            const id = getId(request.url)
            const average = await database.responses.getAverageEmotionByPage(id);

            response
                .status(OK)
                .send(average)
        })
    )
);


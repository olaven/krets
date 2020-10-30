import { NextApiHandler } from "next";
import { database } from "../../../database/database";
import { PaginatedModel, UserModel } from "../../../models/models"
import { withCors, withAuthentication, withErrorHandling, withMethodHandlers, asAdmin } from "../../../middleware/middleware";

const applyMiddleware = (getHandler: NextApiHandler) => withCors(
    withAuthentication(
        withErrorHandling(
            asAdmin(
                withMethodHandlers({
                    GET: getHandler
                })))));

export default applyMiddleware(
    async (request, response) => {

        //const requestKey = getKey(request.url) as string;
        const requestKey = request.query.key as string;
        const data = await database.users.getAll({ key: requestKey, amount: 10 });

        const page: PaginatedModel<UserModel> = {
            data: data,
            next: `/api/users?key=${data[data.length - 1]?.created_at}`
        };

        response
            .json(page);
    });
import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "../../../../auth/auth0";
import { database } from "../../../../../src/database/database"
import { withAuthentication, withErrorHandling, withMethodHandlers } from "../../../../middleware/middleware";
import { withCors } from "../../../../middleware/withCors";
import { QuestionModel } from "../../../../models/models";
import { CREATED, FORBIDDEN, BAD_REQUEST } from "node-kall";
import {/*  getIncludeArchived, */ getPathParam } from "../../../../helpers/workarounds";


const getId = (url: string) => getPathParam(url, 2);

const getQuestions = async (request: NextApiRequest, response: NextApiResponse) => {

    const pageId = getId(request.url);
    //const includeArchived = getIncludeArchived(request.url);
    const includeArchived = request.query.includeArchived === 'true';

    const retrieved = includeArchived ?
        await database.questions.getByPage(pageId) :
        await database.questions.getNonArchivedByPage(pageId);

    response.json(retrieved);
};

const postQuestion = withErrorHandling(withAuthentication(async (request, response) => {

    const { user } = await auth0.getSession(request);
    const page = await database.pages.get(getId(request.url));

    const question = request.body as QuestionModel;

    if (page?.owner_id !== user.sub || question.page_id !== page?.id)
        return response.status(FORBIDDEN).end();

    try {
        const persisted = await database.questions.create(question);
        return response
            .status(CREATED)
            .send(persisted);
    } catch {

        //TODO: figure out why this is not done by `withErrorHandling`
        return response
            .status(BAD_REQUEST)
            .end();
    }


}));

export default withCors(
    withErrorHandling(
        withMethodHandlers({
            GET: getQuestions,
            POST: postQuestion,
        })
    )
)
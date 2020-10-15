import { NextApiRequest, NextApiResponse } from "next";
import { NOT_FOUND, BAD_REQUEST, CREATED } from "node-kall";
import { pages, responses, answers as answersDB } from "../../../../database/database";
import { withCors, withMethods, withMethodHandlers, withErrorHandling } from "../../../../middleware/middleware";
import { ResponseAnswerModel, ResponseModel } from "../../../../models/models";
import { getPathParam, nullify } from "../../../../workarounds";


//TODO: auth protection? 
const getResponses = async (request: NextApiRequest, response: NextApiResponse) => {

    const id = getPathParam(request.url, 2);
    const requestKey = nullify(request.query.key as string);

    const page = await pages.getPage(id);

    if (!page)
        return response
            .status(NOT_FOUND)
            .send("No page found");


    const data = await responses.getResponses(id, {
        key: requestKey,
        amount: 10
    });

    const responseKey = data[data.length - 1]?.created_at;
    response.json({
        data,
        next: `/api/pages/${page.id}/responses?key=${responseKey}`
    });
}


const postResponses = async (req: NextApiRequest, res: NextApiResponse) => {

    const { response, answers } = req.body as ResponseAnswerModel;

    const page = await pages.getPage(response.page_id)
    if (page.mandatory_contact_details && !response.contact_details)
        return res
            .status(BAD_REQUEST)
            .end()

    const persistedResponse = await responses.createResponse(response);
    await answersDB.createAnswers(
        answers.map(answer => ({
            ...answer,
            response_id: persistedResponse.id
            //TODO: something similar for `question_id`?
        }))
    );

    res
        .status(CREATED)
        .json(persistedResponse);
}


export default withCors(
    withErrorHandling(
        withMethodHandlers({
            GET: getResponses,
            POST: postResponses
        })
    )
);
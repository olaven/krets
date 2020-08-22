import { NextApiRequest, NextApiResponse } from "next";
import { withAuthentication, withMethodHandlers } from "../../../../middleware/middleware";
import { withCors } from "../../../../middleware/withCors";

const getQuestions = (request: NextApiRequest, response: NextApiResponse) => {

    response.status(504).end();
};

const postQuesiton = withAuthentication((request, response) => {

    response.status(504).end();
});

const putQuestion = withAuthentication((request, response) => {

    response.status(504).end();
});

export const deleteQuestion = withAuthentication((request, response) => {

    response.status(504).end();
});

export default withCors(
    withMethodHandlers({
        GET: getQuestions,
        POST: postQuesiton,
        PUT: putQuestion,
        DELETE: deleteQuestion,
    })
)
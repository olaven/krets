import {withDatabase} from "./connect";
import {async} from "q";


const getResponses = (pageId: string) => withDatabase(async client => {

    const result =  await client
        .query(`
            select distinct * from responses 
            where page_id = $1
        `, [
            pageId]);

    
    return result.rows;
});


interface Response {
    emotion: "happy" | "neutral" | "sad",
    text: string,
    page_id: string
}

const createResponse = async (response: Response) => withDatabase(async (client) => {

    const result = await client.query(
        "insert into responses(emotion, text, page_id) values($1, $2, $3) RETURNING *",
        [response.emotion, response.text, response.page_id]
    );

    if (result.rowCount !== 1) throw "error inserting response..";

    const responseId = result.rows[0].id;

    await client.query(
        "insert into responses_to_pages(page_id, response_id) values($1, $2)",
        [response.page_id, responseId]
    )
});


export const responses = ({
    getResponses,
    createResponse
});

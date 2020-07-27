import { withDatabase } from "./connect";
import { ResponseModel } from "../models";


const getResponses = (pageId: string) => withDatabase<ResponseModel[]>(async client => {

    const result = await client
        .query(`
            select distinct * from responses 
            where page_id = $1
        `, [
            pageId]);


    return result.rows;
});


const createResponse = async (response: ResponseModel) => withDatabase<ResponseModel>(async (client) => {

    const result = await client.query(
        "insert into responses(emotion, text, page_id, contact_details) values($1, $2, $3, $4) RETURNING *",
        [response.emotion, response.text, response.page_id, response.contact_details]
    );

    if (result.rowCount !== 1) throw "error inserting response..";
    return result.rows[0];
});


export const responses = ({
    getResponses,
    createResponse
});

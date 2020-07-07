import { withDatabase } from "./connect";
import { ReseponseModel } from "../models";


const getResponses = (pageId: string) => withDatabase<ReseponseModel[]>(async client => {

    const result = await client
        .query(`
            select distinct * from responses 
            where page_id = $1
        `, [
            pageId]);


    return result.rows;
});


const createResponse = async (response: ReseponseModel) => withDatabase<ReseponseModel>(async (client) => {

    const result = await client.query(
        "insert into responses(emotion, text, page_id) values($1, $2, $3) RETURNING *",
        [response.emotion, response.text, response.page_id]
    );

    if (result.rowCount !== 1) throw "error inserting response..";
    return result.rows[0];
});


export const responses = ({
    getResponses,
    createResponse
});

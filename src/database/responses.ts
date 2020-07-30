import { withDatabase, firstRow } from "./connect";
import { ResponseModel, Emotion } from "../models";

/**
* The database expects `emotion` to have type `integer`, while 
* the TS model stores them as strings of enum Emotion (":-)", ":-|", ":-(")
* @param emotion Emotion from mode
*/
export const convertEmotion = {
    toSQL: (emotion: Emotion) => ({
        ":-)": 2,
        ":-|": 1,
        ":-(": 0
    })[emotion],
    toModel: (emotion: number) => [
        ":-(", ":-|", ":-)"
    ][emotion]
}

const getResponses = (pageId: string) => withDatabase<ResponseModel[]>(async client => {

    const result = await client
        .query(`
            select distinct * from responses 
            where page_id = $1
        `, [
            pageId]);

    result.rows
        .forEach(row => row.emotion = convertEmotion.toModel(row.emotion))
    return result.rows;
});


const createResponse = async (response: ResponseModel) => withDatabase<ResponseModel>(async (client) => {

    const emotion = convertEmotion.toSQL(response.emotion)
    const result = await client.query(
        "insert into responses(emotion, text, page_id, contact_details) values($1, $2, $3, $4) RETURNING *",
        [emotion, response.text, response.page_id, response.contact_details]
    );

    if (result.rowCount !== 1) throw "error inserting response..";
    return result.rows[0];
});

const getAverageEmotionByPage = async (pageId: string) => withDatabase<number>(async (client) => {

    const result = await client.query(
        "SELECT AVG(emotion) FROM responses WHERE page_id = $1"
        [pageId]
    );

    return result //WHAT IS THIS? 
});


export const responses = ({
    getResponses,
    createResponse,
    getAverageEmotionByPage
});

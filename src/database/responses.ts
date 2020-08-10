import { withDatabase, rows, first } from "./helpers/helpers";
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

//TODO: should figure out a way to convert this over to `helper/query`-functions
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

const createResponse = async (response: ResponseModel) => {

    const emotion = convertEmotion.toSQL(response.emotion);
    return first(
        "insert into responses(emotion, text, page_id, contact_details) values($1, $2, $3, $4) RETURNING *",
        [emotion, response.text, response.page_id, response.contact_details]
    );
}

const getAverageEmotionByPage = async (pageId: string) => {

    const average = await first<{ avg: string | null }>(
        `SELECT AVG(emotion) FROM responses WHERE page_id = $1`,
        [pageId]
    );

    return average.avg ?
        parseFloat(average.avg) :
        0 // If there are no responses
}


export const responses = ({
    getResponses,
    createResponse,
    getAverageEmotionByPage
});

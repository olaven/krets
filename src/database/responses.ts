import { withDatabase, rows, first } from "./helpers/helpers";
import { ResponseModel, Emotion, CoordinateModel } from "../models";
import { createWatchCompilerHost } from "typescript";

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

export const getLineCoordinates = async (pageId: string) => {

    const responses = await rows<ResponseModel>(
        `select * from responses where page_id = $1 order by created_at asc`,
        [pageId]
    );

    //NOTE: non-functional loops for performance reasons, as the above query could return a lot of data
    // https://stackoverflow.com/questions/43031988/javascript-efficiency-for-vs-foreach/43032526#43032526
    // https://medium.com/tech-tajawal/loops-performances-in-node-js-9fbccf2d6aa6

    const coordinates: CoordinateModel[] = [];

    outer:
    for (const limit of responses) {

        const relevant: ResponseModel[] = []
        for (const response of responses) {

            if (new Date(response.created_at) > new Date(limit.created_at))
                continue outer;

            relevant.push(response);
        }

        const coordinate = {
            x: "TODO", y: "TODO"
        }

        coordinates.push(coordinate)
    }

    return coordinates;
}

export const responses = ({
    getResponses,
    createResponse,
    getAverageEmotionByPage,
    getLineCoordinates
});

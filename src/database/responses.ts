import { rows, first } from "./helpers/helpers";
import { ResponseModel, Emotion, CoordinateModel } from "../models/models";
import { pages } from "./pages";

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
    toModel: (emotion: number): Emotion => [
        ":-(", ":-|", ":-)"
    ][emotion] as Emotion
}


type PaginationOptions = {
    amount: number,
    key?: string
}
const defaultOptions: PaginationOptions = {
    amount: 10,
    //key: null
}
const getResponses = async (pageId: string, options = defaultOptions) => {

    //THINKABOUT: how to handle absence of options.key in a cleaner way 

    const args = [pageId, options.amount]
    const responses = await rows(`
        select distinct * from responses 
        where page_id = $1 ${options.key ? `and created_at < $3` : ``}
        order by created_at desc
        limit $2`,
        options.key ? [...args, options.key] : args
    ) as ResponseModel[];

    responses.forEach((response) => {
        response.emotion = convertEmotion.toModel(response.emotion as any as number);
    })

    return responses;
}

const createResponse = async (response: ResponseModel) => {

    const emotion = convertEmotion.toSQL(response.emotion);
    return first<ResponseModel>(
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

//FIXME: fugly function. 
//THINKABOUT: calucate chart separately from data fetching 
//THINKABOUT: perhaps should be calculated differently than "all on-demand"
export const getLineCoordinates = async (pageId: string) => {

    const responses = await rows<ResponseModel>(
        `select * from responses where page_id = $1 order by created_at asc`,
        [pageId]
    );

    //NOTE: non-functional loops for performance reasons, as the above query could return a lot of data
    // https://stackoverflow.com/questions/43031988/javascript-efficiency-for-vs-foreach/43032526#43032526
    // https://medium.com/tech-tajawal/loops-performances-in-node-js-9fbccf2d6aa6

    const coordinates: CoordinateModel[] = [];

    for (const limit of responses) {

        const relevant: ResponseModel[] = []
        for (const response of responses) {

            if (new Date(response.created_at) > new Date(limit.created_at))
                continue; //continue outer? 

            relevant.push(response);
        }

        let sum = 0
        for (const response of relevant) {

            sum += response.emotion as any as number;
        }

        const average = sum / responses.length
        const coordinate = {
            x: new Date(limit.created_at),
            y: average,
        }

        coordinates.push(coordinate)
    }

    const page = await pages.getPage(pageId)
    coordinates[coordinates.length - 1].label = page.name

    return coordinates;
};

export const responses = ({
    getResponses,
    createResponse,
    getAverageEmotionByPage,
    getLineCoordinates
});

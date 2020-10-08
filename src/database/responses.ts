import { rows, first } from "./helpers/helpers";
import { ResponseModel, Emotion, CoordinateModel, DistributionModel } from "../models/models";
import { pages } from "./pages";
import { PaginationOptions } from "./helpers/PaginationOptions";

/**
* The database expects `emotion` to have type `integer`, while 
* the TS model stores them as strings of enum Emotion (":-)", ":-|", ":-(")
* @param emotion Emotion from mode
* //THINKABOUT: have the model storing nubers as well, and converting to smileys on the client 
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

//THINKABOUT: not sure what the value of this defualt is, as `amount` has to be passed manually when key is passed either way 
const defaultOptions: PaginationOptions = {
    amount: 10,
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

const getResponse = (id: string) =>
    first<ResponseModel>(
        `select * from responses where id = $1`,
        [id]
    );

const createResponse = async (response: ResponseModel) => {

    const emotion = convertEmotion.toSQL(response.emotion);
    return first<ResponseModel>(
        "insert into responses(emotion, page_id, contact_details) values($1, $2, $3) RETURNING *",
        [emotion, response.page_id, response.contact_details]
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

/**
 * Returns the amount of responses on given page
 * @param pageId 
 */
const getCount = async (pageId: string) => {

    const result = await first<{ count: string }>(
        "select count(*) from responses where page_id = $1",
        [pageId]
    );

    return parseInt(result.count);
}

const getEmojiDistribution = (pageId: string) =>
    first<DistributionModel>(`
        select page_id, 
            (SELECT COUNT(*) FROM responses WHERE emotion='2' and page_id = $1) as happy,
            (SELECT COUNT(*) FROM responses WHERE emotion='1' and page_id = $1) as neutral,
            (SELECT COUNT(*) FROM responses WHERE emotion='0' and page_id = $1) as sad
        from responses where page_id = $1
    `, [pageId]);

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
    getResponse,
    getCount,
    createResponse,
    getAverageEmotionByPage,
    getEmojiDistribution,
    getLineCoordinates
});

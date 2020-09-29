import { withDatabase } from "./connect";

/**
 * Returns the first result of given query. 
 * Great for getting one value. 
 * @param query the query string with value placeholders i.e. '$n'
 * @param values the values to replace '$n'
 */
export const first = async <T>(query: string, values: any[]) => {

    const queryResult = await rows<T>(query, values);
    return queryResult.length > 0 ?
        queryResult[0] :
        null
};

/**
 * Returns all rows from given query. 
 * Great for getting multiple elements. 
 * @param query the query string with value placeholders i.e. '$n'
 * @param values the values to replace '$n'
 */
export const rows = <T>(query: string, values: any[]) =>
    withDatabase<Array<T>>(async client => {

        const result = await client.query(query, values);
        return result.rows;
    });

/**
 * Runs the query without returning anything. 
 * Great when the returned result is not relevant. 
 * @param query the query string with value placeholders i.e. '$n'
 * @param values the values to replace '$n'
 */
export const run = (query: string, values: any[] = []) =>
    withDatabase<void>(async client => {

        await client.query(query, values);
    });

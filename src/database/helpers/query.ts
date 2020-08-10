import { withDatabase } from "./connect";

export const first = async <T>(query: string, values: any[]) => {

    const firstRow = await withDatabase<T>(async client => {

        const result = await client.query(query, values);
        return result.rowCount > 0 ?
            result.rows[0] :
            null
    });

    return firstRow;
};

export const rows = async <T>(query: string, values: any[]) => {

    const rows = await withDatabase<Array<T>>(async client => {

        const result = await client.query(query, values);
        return result.rows;
    });

    return rows;
}

export const run = (query: string, values: any[] = []) =>
    withDatabase<void>(async client => {

        await client.query(query, values);
    });

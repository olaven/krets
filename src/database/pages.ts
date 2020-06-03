import {withDatabase} from "./connect";

interface Page  {
    id: string,
    name: string,
    owner_id: string
}

const createPage = (page: Page) => withDatabase(async (client) => {

    const result = await client.query(
        "insert into pages(id, owner_id, name) values($1, $2, $3) returning *",
        [page.id, page.owner_id, page.name]);

    return result.rows[0];
});


const getByOwner = (ownerId: string) => withDatabase(async client => {

    const result = await client.query(
        "select * from pages where owner_id = $1",
        [ownerId]
    );

    return result.rows;
});


const getPage = (id: string) => withDatabase(async (client) => {

    const result = await client.query("select * from pages where id = $1", [id]);

    if (result.rowCount > 0) return result.rows[0];
    else return null;
});


export const pages = ({
    getPage,
    getByOwner,
    createPage
});
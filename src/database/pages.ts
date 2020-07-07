import { withDatabase } from "./connect";
import { PageModel } from "../models";


const createPage = (page: PageModel) => withDatabase<PageModel>(async (client) => {

    const result = await client.query(
        "insert into pages(id, owner_id, name) values($1, $2, $3) returning *",
        [page.id, page.owner_id, page.name]);

    return result.rows[0];
});


const getByOwner = (owner_id: string) => withDatabase<PageModel[]>(async client => {

    const result = await client.query(
        "select * from pages where owner_id = $1",
        [owner_id]
    );

    return result.rows;
});


const getPage = (id: string) => withDatabase<PageModel>(async (client) => {

    const result = await client.query("select * from pages where id = $1", [id]);

    if (result.rowCount > 0) return result.rows[0];
    else return null;
});

const updatePage = async (page: PageModel) => withDatabase<PageModel>(async client => {

    const result = await client.query("update pages set name = $1 where id = $2", [page.name, page.id]);
    return result.rowCount > 0 ?
        result.rows[0] :
        null
});


export const pages = ({
    getPage,
    getByOwner,
    createPage,
    updatePage
});
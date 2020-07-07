import { withDatabase, firstRow } from "./connect";
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
    return firstRow(result);
});

const updatePage = async (page: PageModel) => withDatabase<PageModel>(async client => {

    const result = await client.query("update pages set name = $1 where id = $2", [page.name, page.id]);
    return firstRow(result);
});

const deletePage = async (id: string) => withDatabase<PageModel>(async client => {

    const result = await client.query("delete from pages where id = $1", [id]);
    return firstRow(result);
});


export const pages = ({
    getPage,
    getByOwner,
    createPage,
    updatePage,
    deletePage
});
import { withDatabase, firstRow } from "./connect";
import { PageModel } from "../models";


const createPage = (page: PageModel) => withDatabase<PageModel>(async (client) => {

    const result = await client.query(
        "insert into pages(id, owner_id, name, color) values($1, $2, $3, $4) returning *",
        [page.id, page.owner_id, page.name, page.color]);

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

    const result = await client.query("update pages set name = $1, color = $2 where id = $3 returning *", [page.name, page.color, page.id]);
    return firstRow(result);
});

/**
 * DANGER: will delete responses as well! 
 * @param id id of page
 */
const deletePage = async (id: string) => withDatabase<PageModel>(async client => {


    await client.query(`delete from responses where page_id = $1`, [id]);
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
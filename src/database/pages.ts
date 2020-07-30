import { withDatabase, firstRow } from "./connect";
import { PageModel } from "../models";


const createPage = (page: PageModel) => withDatabase<PageModel>(async (client) => {

    const result = await client.query(
        "insert into pages(id, owner_id, name, category_id ,color) values($1, $2, $3, $4, $5) returning *",
        [page.id, page.owner_id, page.name, page.category_id, page.color]
    );

    return result.rows[0];
});


const getByOwner = (ownerId: string) => withDatabase<PageModel[]>(async client => {

    const result = await client.query(
        "select * from pages where owner_id = $1",
        [ownerId]
    );

    return result.rows;
});

const getByOwnerAndCategory = (ownerId: string, categoryId: string) => withDatabase<PageModel[]>(async client => {

    const result = await client.query(
        `select * from pages where owner_id = $1 and category_id = $2`,
        [ownerId, categoryId]
    );

    return result.rows;
});

const getPage = (id: string) => withDatabase<PageModel>(async (client) => {

    const result = await client.query("select * from pages where id = $1", [id]);
    return firstRow(result);
});

const updatePage = (page: PageModel) => withDatabase<PageModel>(async client => {

    const result = await client.query("update pages set name = $1, category_id = $2, color = $3 where id = $4 returning *", [page.name, page.category_id, page.color, page.id]);
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
    getByOwnerAndCategory,
    createPage,
    updatePage,
    deletePage,
});
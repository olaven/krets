import { first, rows, run } from "./helpers/helpers";
import { PageModel } from "../models/models";
import { PaginationOptions } from "./helpers/PaginationOptions";


const createPage = (page: PageModel) => first<PageModel>(
    "insert into pages(id, owner_id, name, category_id ,color) values($1, $2, $3, $4, $5) returning *",
    [page.id, page.owner_id, page.name, page.category_id, page.color]
);

const getByOwner = (ownerId: string, options: PaginationOptions = { amount: 15 }) =>
    rows<PageModel>(
        `
            select * from pages 
            where owner_id = $1 ${options.key ? `and created_at < $3` : ''}
            order by created_at desc
            limit $2
        `,
        options.key ?
            [ownerId, options.amount, options.key] :
            [ownerId, options.amount]
    );


//THINKABOUT: implement pagination before categories are pushed as a feature
const getByOwnerAndCategory = (ownerId: string, categoryId: string) =>
    rows<PageModel>(
        `select * from pages where owner_id = $1 and category_id = $2`,
        [ownerId, categoryId]
    );

const getPage = (id: string) =>
    first<PageModel>(
        "select * from pages where id = $1",
        [id]
    );

const updatePage = (page: PageModel) =>
    first<PageModel>(
        "update pages set name = $1, custom_title = $2, category_id = $3, color = $4 where id = $5 returning *",
        [page.name, page.custom_title, page.category_id, page.color, page.id]
    );


/**
 * DANGER: will delete responses as well! 
 * @param id id of page
 */
const deletePage = async (id: string) => {

    await run(`delete from responses where page_id = $1`, [id]);
    return first<PageModel>("delete from pages where id = $1", [id]);
}


const pageExists = async (id: string) => {

    const result = await first<{ count: string }>(
        "select count(*) from pages where id = $1",
        [id]
    )

    return result.count === '1';
}

export const pages = ({
    getPage,
    getByOwner,
    getByOwnerAndCategory,
    createPage,
    updatePage,
    deletePage,
    pageExists,
});
import { first, rows, run } from "./helpers/helpers";
import { PageModel } from "../models/models";
import { PaginationOptions } from "./helpers/PaginationOptions";


export const create = (page: PageModel) => first<PageModel>(
    "insert into pages(id, owner_id, name, category_id, color) values($1, $2, $3, $4, $5) returning *",
    [page.id, page.owner_id, page.name, page.category_id, page.color]
);

export const getByOwner = (ownerId: string, options: PaginationOptions = { amount: 15 }) =>
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


//NOTE: not used after Stripe Removal. May prove useful in the future. 
//NOTE: count is `string` due to bigint > max `number` value. See: https://github.com/brianc/node-postgres/issues/378
export const getCustomerToPageCount = () => rows<{
    id: string, count: string
}>(
    `
        select count(pages.id), users.id
        from pages right join users 
        on pages.owner_id = users.id
        where active = 'true' 
        group by users.id;
    `,
    []
)

//THINKABOUT: use pagination?
export const getByOwnerAndCategory = (ownerId: string, categoryId: string) =>
    rows<PageModel>(
        `select * from pages where owner_id = $1 and category_id = $2`,
        [ownerId, categoryId]
    );

export const get = (id: string) =>
    first<PageModel>(
        "select * from pages where id = $1",
        [id]
    );

export const update = (page: PageModel) =>
    first<PageModel>(
        `
            update pages 
            set name = $1, custom_title = $2, category_id = $3, color = $4, mandatory_contact_details = $5 
            where id = $6 
            returning *`,
        [page.name, page.custom_title, page.category_id, page.color, page.mandatory_contact_details, page.id]
    );


/**
 * DANGER: Permanently deletes
 * * page 
 * * all responses 
 * * all questions 
 * @param id id of page
 */
export const _delete = async (id: string) => {

    await run(
        `delete from answers 
            where response_id in (
                select id from responses where page_id = $1
            )
        `,
        [id]);
    await run(`delete from questions where page_id = $1`, [id]);
    await run(`delete from responses where page_id = $1`, [id]);
    await run(`delete from embeddables where page_id = $1`, [id]);
    return first<PageModel>("delete from pages where id = $1", [id]);
}

export const exists = async (id: string) => {

    const result = await first<{ count: string }>(
        "select count(*) from pages where id = $1",
        [id]
    )

    return result.count === '1';
}
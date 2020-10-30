import { CategoryModel } from "../models/models";
import { first, rows } from "./helpers/helpers";

export const getByOwner = (ownerId: string) =>
    rows<CategoryModel[]>(
        "select * from categories where owner_id = $1",
        [ownerId]
    )

export const create = (category: CategoryModel) =>
    first<CategoryModel>(
        "insert into categories(owner_id, name) values($1, $2) returning *",
        [category.owner_id, category.name]
    );

export const hasOwner = async (userID: string, categoryID: string) => {

    const result = await first<{ case: '0' | '1' }>(
        `
            select case when exists (
                select * from categories 
                where owner_id = $1 and id = $2
            )
            then CAST(1 as BIT)
            else CAST(0 as BIT) end
        `,
        [userID, categoryID]
    );

    return result.case === '1';
}
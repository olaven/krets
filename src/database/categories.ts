import { CategoryModel } from "../models";
import { withDatabase } from "./connect";

const getByOwner = (ownerId: string) => withDatabase<CategoryModel[]>(async client => {

    const result = await client.query(
        "select * from categories where owner_id = $1",
        [ownerId]
    );

    return result.rows;
});

const createCategory = (category: CategoryModel) => withDatabase<CategoryModel>(async client => {

    const result = await client.query(
        "insert into categories(owner_id, name) values($1, $2) returning *",
        [category.owner_id, category.name]);

    return result.rows[0];
});

export const categories = {
    createCategory, getByOwner
}

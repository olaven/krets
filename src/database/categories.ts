import { CategoryModel } from "../models";
import { withDatabase } from "./connect";



const createCategory = (category: CategoryModel) => withDatabase<CategoryModel>(async client => {

    //TODO: test 
    const result = await client.query(
        "insert into categories(owner_id, name) values($1, $2) returning *",
        [category.owner_id, category.name]);

    return result.rows[0];
});

export const categories = {
    createCategory
}

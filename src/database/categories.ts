import { CategoryModel } from "../models";
import { first, rows } from "./helpers/helpers";

const getByOwner = (ownerId: string) => rows<CategoryModel[]>(
    "select * from categories where owner_id = $1",
    [ownerId]
)

const createCategory = (category: CategoryModel) => first<CategoryModel>(
    "insert into categories(owner_id, name) values($1, $2) returning *",
    [category.owner_id, category.name]
);

export const categories = {
    createCategory, getByOwner
}

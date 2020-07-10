import * as faker from "faker";
import { pages } from "../../src/database/pages";
import { UserModel } from "../../src/models";
import { users } from "../../src/database/users";

export const createUser = async (): Promise<UserModel> => users.createUser({
    id: faker.random.uuid() as string
});


export const createPage = (ownerId: string, categoryId: string | null = null) => pages.createPage({
    owner_id: ownerId,
    name: faker.company.companyName(),
    id: faker.random.uuid(),
    category_id: categoryId
});
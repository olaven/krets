import { database } from "../../../../src/database/database";
import { randomUser } from "../../database/databaseTestUtils";

export const createAdmin = async () => {

    const user = await database.users.createUser(randomUser());
    const asAdmin = await database.users.updateRole({ ...user, role: "administrator" });
    return asAdmin;
}
export const createBasicUser = async () =>
    database.users.createUser(randomUser());


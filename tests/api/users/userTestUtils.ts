import { users } from "../../../src/database/database";
import { randomUser } from "../../database/databaseTestUtils";

export const createAdmin = async () => {

    const user = await users.createUser(randomUser());
    const asAdmin = await users.updateRole({ ...user, role: "administrator" });
    return asAdmin;
}
export const createBasicUser = async () =>
    users.createUser(randomUser());


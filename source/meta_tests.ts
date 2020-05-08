import { database } from "./handlers/database.ts"
import { assertEquals } from "../deps.ts";
import { database_test } from "./test_utils.ts";

/**
 * Tests testing the test utils 
 */


const { test } = Deno 

test("database_test clears brands-db after running", () => {

    database_test("name", () => {

        database.brands.set("key", { name: "brand name", owner_id: "owner id" })
    })
})

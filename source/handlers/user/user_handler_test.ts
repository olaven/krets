import { assertEquals, assertNotEquals } from "../../../deps.ts";
import { User } from "../types.ts";
import { handlers } from "../handlers.ts";
import { user_test, post_user, fetch_user } from "../../test_utils.ts";

const { test } = Deno;

test("User app returns true or false depending on mocked token validator's input", 
    user_test(["valid_token"], async (port, user) => {

        //NOTE: this test does not actually utilize tokens (yet?), it is just demonstrating `user_test`
        const response = await fetch_user(port, user.id, "valid_token");
        assertEquals(response.status, 200)
    })
);

test("Getting non-existent user gives 404", user_test(["token"], async (port, user) => {

    const requested_id = "not_a_valid_user_id";
    const response = await fetch_user(port, requested_id, "token"); 

    assertNotEquals(user.id, requested_id);
    assertEquals(response.status, 404); 
}));

test("Posting user is only allowed if token is valid", async () => {

    const first_valid_token = "my_first_valid_token";
    const second_valid_token = "my_second_valid_token";
    const invalid_token = "some_INVALID_token";

    await user_test([first_valid_token, second_valid_token], async (port, user) => {

        const response = await post_user(port, user, first_valid_token); 
        assertEquals(response.status, 201); 
    })(); 

    await user_test([first_valid_token, second_valid_token], async (port, user) => {

        const response = await post_user(port, user, second_valid_token); 
        assertEquals(response.status, 201); 
    })(); 

    await user_test([first_valid_token, second_valid_token], async (port, user) => {

        const response = await post_user(port, user, invalid_token); 
        assertEquals(response.status, 401); 
    })(); 
});

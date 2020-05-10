import { assertEquals } from "../../../deps.ts";
import { User } from "../types.ts";
import { handlers } from "../handlers.ts";
import { with_app, as_user, test_get, test_post } from "../../test_utils.ts";


const { test } = Deno;

const fetch_user = async (port: number, user_id: string, access_token: string) => 
    test_get(`http://localhost:${port}/api/users/${user_id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

const post_user = async (port: number, user: User, access_token: string) => 
    test_post(`http://localhost:${port}/api/users`, user, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    });

const with_user_app = (valid_tokens: string[], action: (port: number) => any) => {

    const mock_token_validator = async (access_token: string) =>
        valid_tokens.includes(access_token);

    return with_app(handlers(mock_token_validator), action);
}

//const user_test = (valid_tokens; string, action: (port: number, user: User))

test("User app returns true or false depending on mocked token validator's input", 
    with_user_app(["valid_token"], port => 
        as_user(async user => {

            const response = await post_user(port, user.id, "first_valid");
            assertEquals(response.status, 200);
        }
    )
)); 

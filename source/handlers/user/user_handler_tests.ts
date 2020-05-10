import { assertEquals } from "../../../deps.ts";
import { User } from "../types.ts";
import { handlers } from "../handlers.ts";
import { with_app, as_user, test_get, test_post } from "../../test_utils.ts";


const { test } = Deno;

const authorization_header = (access_token: string) => ({
    headers: {
            'Authorization': `Bearer ${access_token}`
    }
}); 

const fetch_user = async (port: number, user: User, access_token: string) => 
    test_get(`http://localhost:${port}/api/users/${user.id}`, authorization_header(access_token));

const post_user = async (port: number, user: User, access_token: string) => 
    test_post(`http://localhost:${port}/api/users`, user, authorization_header(access_token));

const user_test = (valid_tokens: string[], action: (port: number, user: User) => (void | Promise<void>)) => {

    const mock_token_validator = async (access_token: string) => 
        valid_tokens.includes(access_token); 
    
    
    return with_app(handlers(mock_token_validator), (port) => 
        as_user(user => action(port, user))
    );
}

test("User app returns true or false depending on mocked token validator's input", 
    user_test(["valid_token"], async (port, user) => {

        //NOTE: this test does not actually utilize tokens (yet?), it is just demonstrating `user_test`
        const response = await fetch_user(port, user, "valid_token");
        assertEquals(response.status, 200)
    })
); 

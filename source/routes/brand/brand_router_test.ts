import { assertEquals, Application, fun } from "../../../deps.ts";
import { Brand, User } from "../../handlers/types.ts";
import { with_db } from "../../../source/test_utils.ts" 
import { fetch_brand } from "./test_utils.ts";
import { routes } from "../routes.ts";


const { test } = Deno; 

const random_port = () => 
    Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;

export const with_app = (action: (port: number) => any, port = random_port()) => async () => {

    await with_db(() => {

        fun(new Application())
            .run(application => {

                application.use(...routes);
                application.listen({ port });
                action(port);
            })
    });
} 


test("soem test ", with_app(async port => {

    const response = await fetch_brand(port, "some brand"); 
    assertEquals(response.status, 404);
}));


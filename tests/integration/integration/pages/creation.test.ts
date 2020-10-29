import * as uiText from "../../../../src/text";
import { randomUser } from "../../../unit/database/databaseTestUtils";
import { database } from "../../../../src/database/database";
describe("Testing creation of pages", () => {

    /**
     * Wrapper for test functions that need a logged in user. 
     * Mocking auth0 endpoints and creating a user in the database. 
     */
    const withUser = (id: string, runner: (cy: Cypress.cy) => any) =>
        async () => {


            //FIXME: somehow add user with same ID as auth0 mock 
            /* await database.users.createUser(
                randomUser(id)
            ) */

            runner(
                cy
                    .server()
                    .route2("GET", "/api/auth/me", { fixture: "authuser.json" })
            )
        }

    //FIXME: test not done yet, need to get `withUser` abstraction working  
    it.only("is possible to create a page if logged in at the home page",
        withUser("some-user", cy => cy

            .visit("/")
            .contains(uiText.pageCreator.placeholder)
            .type("Hello typing :D")
        )
    );


    it("Can navigate to about page", () =>
        cy
            .visit("/")
            .contains(uiText.buttons.aboutPage)
            .click()
            .contains(uiText.about.heading)
    )
}); 
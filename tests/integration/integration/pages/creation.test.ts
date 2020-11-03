import * as uiText from "../../../../src/text";

//NOTE: should collect some of thes in non-unit files 
import { randomUser } from "../../../unit/database/databaseTestUtils";
import { randomAuthUser } from "../../../unit/api/apiTestUtils";
import { database } from "../../../../src/database/database";

describe.skip("Testing creation of pages", () => {


    /**
     * Wrapper for test functions that need a logged in user. 
     * Mocking auth0 endpoints and creating a user in the database. 
     */
    const withUser = (id: string) =>
        (callback: (cy: Cypress.cy) => any) =>
            () => {

                callback(
                    cy
                        .task("createUser", id)
                        .server()
                        .route2("GET", "/api/auth/me", { fixture: "randomAuthUser()" })
                )
            }


    //FIXME: test not done yet, need to get `withUser` abstraction working  

    it.only("thing", () => cy
        .task("createUser")
        .route2("GET", "/api/auth/me", { fixture: "randomAuthUser()" })
        .visit("/")
        .contains(uiText.pageCreator.placeholder)
        .type("Hello from currying variant")
    )

    it(
        "Currying variant of mock",
        withUser("some-user")(cy =>
            cy
                .visit("/")
                .contains(uiText.pageCreator.placeholder)
                .type("Hello from currying variant")
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
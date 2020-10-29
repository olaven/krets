import * as uiText from "../../../../src/text";
describe("Testing creation of pages", () => {

    it.only("Is possible to create a page with the page creator", () =>
        cy
            .server()
            .route2('GET', '/api/auth/me', { fixture: "authuser.json" })
            .route2("GET", "/api/users/*", { fixture: "user.json" })
            .visit("/")
            .contains(uiText.pageCreator.placeholder)
            .type("Some page name")
    );

    it("Can navigate to about page", () =>
        cy
            .visit("/")
            .contains(uiText.buttons.aboutPage)
            .click()
            .contains(uiText.about.heading)
    )
}); 
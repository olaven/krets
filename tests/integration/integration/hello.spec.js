describe("My first test", () => {

    it("Should pass", () => {

        expect(true).to.equal(true);
    });

    it("Should work when using `cy`", () => {

        cy.visit("https://duckduckgo.com")
    });
});
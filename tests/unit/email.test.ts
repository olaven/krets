import * as faker from "faker";
import { validateEmail } from "../../src/helpers/email";

describe("The module for common email utilities", () => {

    describe("The function for validating email", () => {

        const fails = (email: string) => expect(
            validateEmail(email)
        ).toBe(false);

        const passes = (email: string) => expect(
            validateEmail(email)
        ).toBe(true);

        it("Does not accept an empty string", () => {

            fails("");
        });

        it("Does accepet a valid email", () => {

            passes("test@example.com");
        });

        it("Does not accept `null`", () => {

            fails(null as string);
        });

        it("Does not work on single word", () => {

            fails(faker.lorem.word());
        });

        it("Does work on random given email", () => {

            passes(faker.internet.email());
        });

        it("Does not work without top level domain", () => {
            fails("some@example");
        });

        it("Does not work without username", () => {

            fails("@example.com");
        });

        it("Does not work without '@'", () => {

            fails("someexample.com");
        });

        it("Does not work with two '.'", () => {

            fails("some@example..com");
        });
        it("Does not fail with subdomain", () => {

            passes("some@test.example.com");
        });

        it("Fails when reversed", () => {

            fails("com.example@some");
        });
    });
});
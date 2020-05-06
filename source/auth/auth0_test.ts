import { get_auth0 } from "./auth0.ts"
import { assertThrows, assertEquals } from "../../deps.ts";
const { test } = Deno

const mock_env = (id: string, secret: string, domain: string, host_uri = "localhost:8080") => {

    Deno.env.set("auth0_client_id", id);
    Deno.env.set("auth0_client_secret", secret);
    Deno.env.set("auth0_domain", domain);
    Deno.env.set("host_uri", host_uri)
}

const clear_env = () => {

    Deno.env.set("auth0_client_id", "");
    Deno.env.set("auth0_client_secret", "");
    Deno.env.set("auth0_domain", "");
}

test("Loads client id", () => {

    const id = "my amazing id"
    mock_env(id, "secret", "domain");
    console.log("env", Deno.env.toObject())

    const env = get_auth0();
    assertEquals(env.auth0_client_id, id);
    clear_env()
});

test("Loads client secret", () => {

    const secret = "my amazing secret"
    mock_env("id", secret, "domain");
    
    const env = get_auth0();
    assertEquals(env.auth0_client_secret, secret) ;
    clear_env()
});

test("Loads client domain", () => {

    const domain = "my amazing domain"
    mock_env("id", "secret", domain);
    
    const env = get_auth0();
    assertEquals(env.auth0_domain, domain) ;
    clear_env();
});

test("Loads host uri", () => {

    const host_uri = "https://localhost:1234"
    mock_env("id", "secret", "domain", host_uri);
    
    const env = get_auth0();
    assertEquals(env.host_uri, host_uri) ;
    clear_env();
});

test("Throws if variables are missing", () => {

    //NOTE: not mocking env 
    assertThrows(() => {

        const env = get_auth0();
    });
});
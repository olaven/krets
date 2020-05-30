import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import {postBrand, setupServer, teardownServer, uid} from "../testutils";
import handler from "../../../src/pages/api/pages/[id]";
import * as faker from "faker";
import Database from "../../../src/database/Database";
import {PageEntity} from "../../../src/database/entities/PageEntity";

describe("Endpoint for getting a specific page", () => {


    let server;
    let url;
    let brandRepository;

    const fullUrl = (brandId) =>
        `${url}${brandId}`;

    beforeAll(async () => {

        await Database.connect();
        brandRepository = (await Database.get()).getRepository(PageEntity);
        //NOTE: URL does not include id - must be added in tests
       [server, url] = await setupServer(handler, "/api/pages/")
    });

    afterAll(async () => {

        await Database.close();
        await teardownServer(server)
    });

    it("Returns 200 if brand exists", async () => {

        const brand = {
            id: uid(),
            ownerId: uid(),
            name: faker.company.companyName()
        };
        const result = await brandRepository.save(brand);

        const full = fullUrl(brand.id);
        console.log("RESULT FROM ADDING DATA BEFOREHAND", result);
        console.log("what am I asking for? ", full);


        const getResponse = await fetch(full);
        expect(getResponse.status).toEqual(200);
    });

    it("Returns 404 if brand does not exists", async () => {

        //NOTE: generating new id instead of using one attached to a brand
        const url = fullUrl(uid());
        console.log("URL: ", url);
        const getResponse = await fetch(url);
        expect(getResponse.status).toEqual(404);
    });
});
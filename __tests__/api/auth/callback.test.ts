import "reflect-metadata";
import {Server} from "net";
import handler from "../../../src/pages/api/auth/callback";
import {authenticatedFetch, setupServer, teardownServer} from "../testutils";
import {afterAll, beforeAll, describe, expect, it, jest} from "@jest/globals";
import * as faker from "faker";
import {UserEntity} from "../../../src/database/remove_typeorm/entities/UserEntity";
import {closeConnection, connect} from "../../../src/database/remove_typeorm/Database";
import {Connection} from "typeorm";

jest.mock("../../../src/auth/auth0");

describe("The callback endpoint", () => {

    let server: Server;
    let url: string;
    let connection: Connection;

    beforeAll(async () => {

        connection = await connect();
        [server, url] = await setupServer(handler, "/api/auth/callback");
    });

    afterAll(async () => {

        await closeConnection();
        await teardownServer(server);
    });

    it("does create user if the user is new", async () => {

        const repository = connection.getRepository(UserEntity);
        const uid = faker.random.uuid();

        const before = await repository.count({where: {id: uid}});
        await authenticatedFetch(uid, url);
        const after = await repository.count({where: {id: uid}});

        expect(before).toEqual(0);
        expect(after).toEqual(1);
    });

    it("does _not_ create if user already exists", async () => {

        const repository = connection.getRepository(UserEntity);
        const user = await repository.save({
            id: faker.random.uuid()
        });

        const before = await repository.count({where: {id: user.id}});
        await authenticatedFetch(user.id, url);
        const after = await repository.count({where: {id: user.id}});

        expect(before).toEqual(1);
        expect(before).toEqual(after);
    })
});
import { createConnection, getConnection, Entity, getRepository } from "typeorm";
import { PrimaryGeneratedColumn, Column } from "typeorm";
import {afterEach, beforeEach, describe, expect, test} from "@jest/globals";
import {establishConnection} from "../../src/server/TypeormConnection";

@Entity()
export class MyEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;
}

describe("Some db example", () => {


    beforeEach(() => {
        return establishConnection()
    });

    afterEach(() => {
        let conn = getConnection();
        return conn.close();
    });

    test("store Joe and fetch it", async () => {
        await getRepository(MyEntity).insert({
            name: "Joe"
        });
        let joe = await getRepository(MyEntity).find({
            where: {
                id: 1
            }
        });
        expect(joe[0].name).toBe("Joe");
    });

    test("store Another and fetch it", async () => {
        await getRepository(MyEntity).insert({
            name: "Another"
        });
        let joe = await getRepository(MyEntity).find({
            where: {
                id: 1
            }
        });
        expect(joe[0].name).toBe("Another");
    });
});
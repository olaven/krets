import {Connection} from "typeorm";
import {UserEntity} from "./entities/UserEntity";
import {BrandEntity} from "./entities/BrandEntity";
import {ResponseEntity} from "./entities/ResponseEntity";

const repository = (connection: Connection) => {

    if (!connection.isConnected) throw "Not connected when getting repository";
    return {
        user: connection.getRepository(UserEntity),
        page: connection.getRepository(BrandEntity),
        response: connection.getRepository(ResponseEntity),
    }
};
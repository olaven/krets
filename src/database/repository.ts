
import {Connection} from "typeorm";


export const repositories = async (connection: Connection) => {

    console.log("Connection: ", connection.isConnected)
    const repository = async (entity: any) =>
        connection.getRepository(entity);

    const {UserEntity} = await import("./entities/UserEntity");
    const {PageEntity} = await import("./entities/PageEntity");
    const {ResponseEntity} = await import("./entities/ResponseEntity");

    if (!connection.isConnected) throw "Not connected when getting repository";
    return {
        user: repository(UserEntity),
        page: repository(PageEntity),
        response: repository(ResponseEntity),
    }
};
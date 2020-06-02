import "reflect-metadata"
import { UserEntity } from "./UserEntity";
import { ResponseEntity } from "./ResponseEntity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm"



@Entity()
export class PageEntity {

    @PrimaryColumn()
    id: string; //LOWECASE without special chars/spaces version of name

    @Column({
        length: 150
    })
    name: string;

    @ManyToOne(type => UserEntity, (user) => user.brands)
    owner: UserEntity;

    @OneToMany(type => ResponseEntity, (response: ResponseEntity) => response.brand)
    responses: ResponseEntity[]
}

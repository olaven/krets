import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, PrimaryColumn, JoinColumn} from "typeorm";
import {UserEntity} from "./UserEntity";

@Entity()
export class BrandEntity {

    @PrimaryColumn()
    id: string; //LOWECASE-without special chars/spaces version of name

    @Column({
        length: 150
    })
    name: string;

    @ManyToOne(type => UserEntity)
    owner: UserEntity;
}
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, PrimaryColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Brand {

    @PrimaryColumn()
    id: string; //LOWECASE-without special chars/spaces version of name

    @Column({
        length: 150
    })
    name: string;

    @ManyToOne(type => User)
    owner: User;
}
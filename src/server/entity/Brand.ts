import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {User} from "./User";

@Entity()
export class Brand extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 150
    })
    name: string;

    @ManyToOne(type => User)
    owner: User;
}
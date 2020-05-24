import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Response extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 1000
    })
    text: string;

    @Column("emotion")
    emotion: string;

    @Column("brand")
    brand: Brand; 
}
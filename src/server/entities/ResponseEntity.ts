import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {Brand} from "./Brand";

@Entity()
export class Response extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 1000
    })
    text: string;

    @Column()
    emotion: string;

    @ManyToOne(type => Brand)
    brand: Brand; 
}
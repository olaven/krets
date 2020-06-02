import "reflect-metadata"
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {PageEntity} from "./PageEntity"

@Entity()
export class ResponseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 1000,
        nullable: false
    })
    text: string;

    @Column({
        nullable: false
    })
    emotion: 'sad' | 'neutral' | 'happy';


    @ManyToOne(type => PageEntity, brand => brand.responses, {
        eager: true
    })
    brand: PageEntity;
}

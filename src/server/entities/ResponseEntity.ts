import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {BrandEntity} from "./BrandEntity";

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


    @ManyToOne(type => BrandEntity, brand => brand.responses, {
        eager: true
    })
    brand: BrandEntity;
}
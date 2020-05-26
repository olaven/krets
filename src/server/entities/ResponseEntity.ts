import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {BrandEntity} from "./BrandEntity";

@Entity()
export class ResponseEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 1000
    })
    text: string;

    @Column()
    emotion: string;

    @ManyToOne(type => BrandEntity)
    brand: BrandEntity;
}
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    PrimaryColumn,
    JoinColumn,
    VersionColumn, OneToMany
} from "typeorm";
import {UserEntity} from "./UserEntity";
import {ResponseEntity} from "./ResponseEntity";

@Entity()
export class BrandEntity {

    @PrimaryColumn()
    id: string; //LOWECASE without special chars/spaces version of name

    @Column({
        length: 150
    })
    name: string;

    @ManyToOne(type => UserEntity)
    owner: UserEntity;

    @OneToMany(type => ResponseEntity, (response: ResponseEntity) => response.brand, {
        //cascadeInsert: true,
        //cascadeUpdate: true,
        //cascadeRemove: true
        cascade: true
    })
    responses: ResponseEntity[]
}
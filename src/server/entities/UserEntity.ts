import "reflect-metadata"
import {PrimaryColumn, Entity, BaseEntity, OneToMany} from "typeorm";
import {BrandEntity} from "./BrandEntity";


@Entity()
export class UserEntity extends BaseEntity {
    /**
        This entities maps to an Auth0 user.
        It is present to allow for database 
        constraints with user-id
     */

    @PrimaryColumn( {
        length: 500
    })
    id: string;

    @OneToMany(type => BrandEntity, (brand) => brand.owner)
    brands: BrandEntity[]
}
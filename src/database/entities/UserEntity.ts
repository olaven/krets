import "reflect-metadata"
import {PrimaryColumn, Entity, BaseEntity, OneToMany} from "typeorm";
import {PageEntity} from "./PageEntity";


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

    @OneToMany(type => PageEntity, (brand) => brand.owner)
    brands: PageEntity[]
}


import "reflect-metadata"
import { PrimaryColumn, Entity, BaseEntity } from "typeorm";


//@Entity()
export class User extends BaseEntity {
    /**
        This entities maps to an Auth0 user.
        It is present to allow for database 
        constraints with user-id
     */

    @PrimaryColumn('text', {
        length: 500
    })
    id: number;
}
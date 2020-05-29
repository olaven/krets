import "reflect-metadata"
import { PrimaryColumn, Entity, BaseEntity } from "typeorm";


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
}
import { PrimaryColumn, BaseEntity } from "typeorm";


@Entity()
export class User extends BaseEntity {
    /**
        This entity maps to an Auth0 user. 
        It is present to allow for database 
        constraints with user-id
     */

    @PrimaryColumn()
    id: number;
}
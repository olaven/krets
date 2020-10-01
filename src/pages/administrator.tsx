import { useContext } from "react";
import { UserCard } from "../components/Administrator/UserCard";
import { Users } from "../components/Administrator/Users";
import { AdminWrapper } from "../components/AdminWrapper";
import { UserContext } from "../context/UserContext";


const Administrator = AdminWrapper(() => {

    const { databaseUser } = useContext(UserContext);
    return <div>
        <UserCard user={databaseUser} />
        <Users />
    </div>
});

export default Administrator;
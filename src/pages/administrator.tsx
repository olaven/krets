import { Users } from "../components/Administrator/Users";
import { AdminWrapper } from "../components/AdminWrapper";


const Administrator = AdminWrapper(() => <div>
    <Users />
</div>);

export default Administrator;
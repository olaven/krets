import { AdminWrapper } from "../components/AdminWrapper";
import admin from "./[pageId]/admin";

const Admin = AdminWrapper(() => <div>
    Du er admin :-)
</div>);

export default Admin;
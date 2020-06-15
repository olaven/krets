import { useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { AdminPageContextProvider, AdminPageContext } from "../../context/AdminPageContext";
import { Box } from "rebass";
import { LoginButton } from "../tiny/buttons";

export const AdminPage = () => {

    const { user } = useContext(UserContext);
    const { page, loading } = useContext(AdminPageContext);

    if (loading) {
        return <Box>
            Laster side...
        </Box>
    }

    if (!user) {
        return <LoginButton />
    }

    if (page && user.sub !== page.owner_id)
        return <Box>
            Denne siden eier du ikke..
        </Box>;

    return <div>hello, admin of {page.name}</div>
}
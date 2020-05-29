import {AuthContext} from "../context/AuthContext";

export const Layout = () => {

    const user = React.useContext(AuthContext)

    return <div>
        Hei
    </div>
};
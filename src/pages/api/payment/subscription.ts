import { KretsCors } from "../../../middleware/KretsCors";
import auth0 from "../../../../auth0";

export default KretsCors(
    auth0.requireAuthentication(async (request, response) => {


    })
);
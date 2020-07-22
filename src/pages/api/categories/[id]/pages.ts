import auth0 from "../../../../../auth0";
import { useRouter } from "next/router";

export default auth0.requireAuthentication(async (request, response) => {


    const { query: id } = useRouter();

}
import auth0 from "../../auth/auth0";


export default auth0.requireAuthentication((request, response) => {

    const { user } = auth0.getSession(request);
    console.info("user: ", user);
        
    response
        .code(200)
        .send("You were authenticated :-)")
});
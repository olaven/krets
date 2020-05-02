import { get, post, contentType } from '../../../deps.ts';


const login_callback = get("/api/auth/callback", (context) => {

    console.log("JEG ER I CALLBACk");
    return "hei hei, her er callback";
});




export const auth_handlers = [
    login_callback
]



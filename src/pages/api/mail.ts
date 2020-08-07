import auth0 from '../../auth/auth0';
import * as nodemailer from "nodemailer";
import { EmailModel } from '../../models';


const getSMTPConfig = async () => {

    const { NODE_ENV } = process.env;
    if (NODE_ENV === "production") {

        {
            //TODO: Hover account 
        }
    } else {

        const account = await nodemailer.createTestAccount();
        return {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass  // generated ethereal password
            }
        }
    }
}

/**
 * Logs link to test URL unless 
 * server is running in production 
 * @param info 
 */
const logMail = (info: any) => {

    if (process.env.NODE_ENV !== "production") {

        const url = nodemailer.getTestMessageUrl(info);
        console.log(`Test mail URL: ${url}`);
    }
}

const send = async (email: EmailModel) => {

    const config = await getSMTPConfig()
    let transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail(email);
    logMail(info);
}

export default auth0.requireAuthentication(async (request, response) => {

    const { user } = await auth0.getSession(request);

    if (request.method !== "POST") {

        response.status(404);
        return;
    }

    console.log("user data: ", user);
    const email = request.body as EmailModel;
    email.text = `${email.text} - ${user.name}`; //TODO: remove in favour of user email as `.from`
    email.to = process.env.CONTACT_EMAIL;
    email.from = process.env.CONTACT_EMAIL; //TODO: should be user email? 

    try {

        await send(email);
        response
            .status(201)
            .send(null);
    } catch {

        response
            .status(400)
            .send(null);
    }
});
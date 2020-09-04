import auth0 from '../../auth/auth0';
import { IApiRoute } from '@auth0/nextjs-auth0/dist/handlers/require-authentication';
import * as nodemailer from "nodemailer";
import { EmailModel } from '../../models/models';
import { withCors, withAuthentication, withErrorHandling, withMethods } from "../../middleware/middleware";

const productionMail = {
    host: "mail.hover.com",
    secureConnection: true,
    port: 465,
    auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASSWORD
    },
    tls: {
        secureProtocol: "TLSv1_method"
    }
}

const getSMTPConfig = async () => {

    if (process.env.NODE_ENV === "production")
        return productionMail;


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

/**
 * Logs link to test URL unless 
 * server is running in production 
 * @param info 
 */
const logMail = (info: any) => {

    if (process.env.NODE_ENV !== "production") {

        const url = nodemailer.getTestMessageUrl(info);
    }
}

const send = async (email: EmailModel) => {

    const config = await getSMTPConfig()
    let transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail(email);
    logMail(info);
}

const withMiddleware = (handler: IApiRoute) =>
    withCors(
        withErrorHandling(
            withMethods(["POST"])(
                withAuthentication(handler))));


export default withMiddleware(async (request, response) => {

    const { user } = await auth0.getSession(request);

    const email = request.body as EmailModel;
    email.to = process.env.CONTACT_EMAIL;
    email.from = user.email;

    await send(email);

    response
        .status(201)
        .send(null);
}); 
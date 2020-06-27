import auth0 from "../../../auth0";

export default async function callback(req, res) {
    try {
        await auth0.handleCallback(req, res, {
            onUserLoaded: async (req, res, session, state) => {

                const { user } = session;

                return {
                    ...session,
                    user: {
                        ...session.user,
                        age: 20
                    },
                    redirectTo: "/"
                };
            }
        });
    } catch (error) {

        res.status(error.status || 400).end(error.message);
    }
}
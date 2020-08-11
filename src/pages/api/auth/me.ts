import auth0 from '../../../auth/auth0';
import { withCors } from '../../../middleware/withCors';
import { withAuthentication } from '../../../middleware/withAuthentication';

export default withCors(
    withAuthentication(async function me(request, response) {

        try {
            await auth0.handleProfile(request, response, {
                refetch: true
            });
        } catch (error) {
            console.error(error);
            response.status(error.status || 500).end(error.message);
        }
    })
);
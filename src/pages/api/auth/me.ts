import auth0 from '../../../auth/auth0';
import { KretsCors } from '../../../middleware/KretsCors';
import { withAuthentication } from '../../../middleware/withAuthentication';

export default KretsCors(
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
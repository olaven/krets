
import auth0 from '../../../auth/auth0';
import { withErrorHandling } from '../../../middleware/withErrorHandling';
import { withCors } from '../../../middleware/withCors';

export default withCors(
    withErrorHandling(auth0.handleLogout)
);



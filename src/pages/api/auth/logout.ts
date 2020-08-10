import auth0 from '../../../auth/auth0';
import { handleError } from '../../../middleware/handleError';
import { KretsCors } from '../../../middleware/cors';

export default KretsCors(
    handleError(auth0.handleLogout)
);


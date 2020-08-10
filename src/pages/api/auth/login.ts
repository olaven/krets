import auth0 from '../../../auth/auth0';
import { handleError } from '../../../middleware/handleError';
import { KretsCors } from '../../../middleware/KretsCors';

export default KretseCors(handleError(auth0.handleLogin)); 
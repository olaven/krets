import auth0 from '../../../auth/auth0';
import { withErrorHandling, withCors } from '../../../middleware/middleware';

export default withCors(withErrorHandling(auth0.handleLogin)); 
import auth0 from '../../../auth/auth0';
import { auth0HandleWrapper } from './logout';

export default auth0HandleWrapper(auth0.handleLogin); 
/* reducers */
import { combineReducers } from 'redux';
import configuration from './ConfigurationReducer';
import authentication from './AuthenticationReducer';
import oAuth from './OAuthReducer';

const authReducer = combineReducers({
  configuration,
  authentication,
  oAuth,
});

export default authReducer;

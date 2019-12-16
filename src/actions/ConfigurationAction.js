import { AUTH_CONFIGURE_SUCCESS, AUTH_CONFIGURE_FAILURE } from '../constants/ActionTypes';
import refreshUser from './RefreshUserAction';
import configureInterceptor from '../utils/AuthInterceptor';
import configureStorage, { retrieveData } from '../utils/SessionStorage';
import { SAVED_CREDS_KEY } from '../constants/Constants';

const configurationSuccess = (config) => ({ type: AUTH_CONFIGURE_SUCCESS, config });

const configurationFailure = (error) => ({ type: AUTH_CONFIGURE_FAILURE, error });

const configureAuth = (config) => async (dispatch) => {
  if (!config.apiUrl) {
    dispatch(configurationFailure('apiUrl is required'));
    return Promise.reject(new Error('apiUrl is required'));
  }

  const mergedConfig = configureStorage(config);
  configureInterceptor();

  dispatch(configurationSuccess(mergedConfig));

  // Look up auth creds from persistent storage
  const creds = await retrieveData(SAVED_CREDS_KEY);
  console.log('creds', creds);
  // If creds, call validate token
  return creds ? dispatch(refreshUser()) : Promise.resolve();
};

export default configureAuth;

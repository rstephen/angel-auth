import {
  AUTH_OAUTH_START,
  AUTH_OAUTH_COMPLETE,
  AUTH_OAUTH_FAILURE,
} from '../constants/ActionTypes';
import { SAVED_CREDS_KEY } from '../constants/Constants';
import refreshUser from './RefreshUserAction';
import { normalizeTokenKeys } from '../utils/UrlParser';
import { persistData } from '../utils/SessionStorage';

export const oAuthSignInStart = (provider) => ({ type: AUTH_OAUTH_START, provider });

export const oAuthSignInError = (errors) => ({ type: AUTH_OAUTH_FAILURE, errors });

export const oAuthSignInComplete = (creds) => (
  (dispatch) => {
    if (creds && creds.uid) {
      return persistData(SAVED_CREDS_KEY, normalizeTokenKeys(creds))
        .then(() => dispatch(refreshUser()))
        .then(() => dispatch({ type: AUTH_OAUTH_COMPLETE }));
    }

    throw new Error('Bad credentials');
  });

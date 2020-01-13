import Cookies from 'browser-cookies';
import { SAVED_CREDS_KEY } from '../constants/Constants';

// even though this code shouldn't be used server-side, node will throw
// errors if "window" is used
// eslint-disable-next-line
const root = Function('return this')() || (42, eval)('this');

root.authState = {
  configuration: {},
};

const defaultConfig = {
  apiPath: '',
  tokenValidationPath: '/auth/validate_token',
  signOutPath: '/auth/sign_out',
  signInPath: '/auth/sign_in',
  signUpPath: '/auth',
  passwordResetPath: '/auth/password',
  passwordUpdatePath: '/auth/password',
  authProviderPaths: {
    linkedin: '/auth/linkedin',
    facebook: '/auth/facebook',
    twitter: '/auth/twitter',
  },
  tokenFormat: {
    'access-token': '{{ access-token }}',
    'token-type': 'Bearer',
    client: '{{ client }}',
    expiry: '{{ expiry }}',
    uid: '{{ uid }}',
  },
};

export const setConfiguration = (s) => {
  root.authState.configuration = { ...defaultConfig, ...s };
  return root.authState.configuration;
};

export const getConfiguration = () => root.authState.configuration;

export const destroySession = () => {
  if (root.localStorage) {
    root.localStorage.removeItem(SAVED_CREDS_KEY);
  }

  Cookies.erase(SAVED_CREDS_KEY, {
    path: root.authState.configuration.cookiePath || '/',
  });
};

export const resetConfiguration = () => {
  root.authState = root.authState || {};
  root.authState.configuration = {};
  destroySession();
};

const unescapeQuotes = (val) => val && val.replace(/("|')/g, '');

export const getApiUrl = () => `${root.authState.configuration.apiUrl}`;

export const isApiRequest = (url) => url.match(getApiUrl()) || !url.startsWith('http');

export const getSignOutUrl = () => `${root.authState.configuration.apiPath}${root.authState.configuration.signOutPath}`;

export const getSignInUrl = () => `${root.authState.configuration.apiPath}${root.authState.configuration.signInPath}`;

export const getSignUpUrl = () => `${root.authState.configuration.apiPath}${root.authState.configuration.signUpPath}?config_name=default`;

export const getPasswordResetRequestUrl = () => `${root.authState.configuration.apiPath}${root.authState.configuration.passwordResetPath}?config_name=default`;

export const getPasswordUpdateUrl = () => `${root.authState.configuration.apiPath}${root.authState.configuration.passwordUpdatePath}`;

export const getTokenValidationUrl = () => `${root.authState.configuration.apiPath}${root.authState.configuration.tokenValidationPath}?unbatch=true`;

export const getOAuthUrl = (provider, params) => {
  let oAuthUrl = `${getApiUrl()}${root.authState.configuration.apiPath}${root.authState.configuration.authProviderPaths[provider]}?auth_origin_url=${encodeURIComponent(root.location.href)}&config_name=default`;
  if (params) {
    Object.keys(params).forEach((key) => {
      oAuthUrl += '&';
      oAuthUrl += encodeURIComponent(key);
      oAuthUrl += '=';
      oAuthUrl += encodeURIComponent(params[key]);
    });
  }

  return oAuthUrl;
};

export const getTokenFormat = () => root.authState.configuration.tokenFormat;

export const removeData = (key) => {
  switch (root.authState.configuration.storage) {
    case 'localStorage':
      root.localStorage.removeItem(key);
      break;
    default:
      Cookies.erase(key);
  }
};

export const persistData = async (key, val) => {
  const json = JSON.stringify(val);
  if (typeof root.authState.configuration.storage !== 'string') {
    await root.authState.configuration.storage.setItem(key, json);
  } else {
    switch (root.authState.configuration.storage) {
      case 'localStorage':
        root.localStorage.setItem(key, json);
        break;
      default:
        Cookies.set(key, json, {
          expires: root.authState.configuration.cookieExpiry,
          path: root.authState.configuration.cookiePath,
        });
        break;
    }
  }
};

export const retrieveData = async (key, storage) => {
  let val = null;
  if (typeof root.authState.configuration.storage !== 'string') {
    val = await root.authState.configuration.storage.getItem(key);
  } else {
    switch (storage || root.authState.configuration.storage) {
      case 'localStorage':
        val = root.localStorage && root.localStorage.getItem(key);
        break;
      default:
        val = Cookies.get(key);
        break;
    }
  }
  // if value is a simple string, the parser will fail. in that case, simply
  // unescape the quotes and return the string.
  try {
    // return parsed json response
    return JSON.parse(val);
  } catch (err) {
    // unescape quotes
    return unescapeQuotes(val);
  }
};

export default setConfiguration;

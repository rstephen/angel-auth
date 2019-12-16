import axios from 'axios';
import { SAVED_CREDS_KEY } from '../constants/Constants';
import {
  isApiRequest,
  getApiUrl,
  getTokenFormat,
  persistData,
  retrieveData,
} from './SessionStorage';

const addAuthorizationHeader = (accessToken, headers) => (
  { ...headers, Authorization: `Bearer ${accessToken}` }
);

const getAuthHeaders = async (url) => {
  if (isApiRequest(url)) {
    // fetch current auth headers from storage
    const currentHeaders = await retrieveData(SAVED_CREDS_KEY) || {};
    console.log('currentHeaders', currentHeaders)
    const nextHeaders = {};

    // bust IE cache
    nextHeaders['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

    // set header for each key in `tokenFormat` config
    Object.entries(getTokenFormat()).forEach(
      ([key, value]) => { nextHeaders[key] = currentHeaders[key]; },
    );

    return addAuthorizationHeader(currentHeaders['access-token'], nextHeaders);
  }

  return {};
};

const updateAuthCredentials = (resp) => {
  // check config apiUrl matches the current response url
  if (resp && resp.config && isApiRequest(resp.config.url)) {
    // set header for each key in `tokenFormat` config
    const newHeaders = {};

    // set flag to ensure that we don't accidentally nuke the headers
    // if the response tokens aren't sent back from the API
    let blankHeaders = true;

    // set header key + val for each key in `tokenFormat` config
    Object.entries(getTokenFormat()).forEach(
      ([key, value]) => {
        newHeaders[key] = resp.headers[key];

        if (newHeaders[key]) {
          blankHeaders = false;
        }
      },
    );

    if (!newHeaders['access-token']) {
      blankHeaders = true;
    }

    // persist headers for next request
    if (!blankHeaders) {
      persistData(SAVED_CREDS_KEY, newHeaders);
    }
  }

  return resp;
};

const configureInterceptor = () => {
  axios.defaults.baseURL = getApiUrl();
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  axios.defaults.headers.patch['Content-Type'] = 'application/json';

  axios.interceptors.request.use(async (request) => {
    const headers = await getAuthHeaders(request.url);
    console.log(request.method, request.url, headers)
    Object.assign(request.headers, headers);
    return request;
  }, (error) => (
    Promise.reject(error)
  ));

  axios.interceptors.response.use((resp) => {
    updateAuthCredentials(resp);
    return resp;
  }, (error) => {
    updateAuthCredentials(error.response);
    return Promise.reject(error);
  });
};

export default configureInterceptor;

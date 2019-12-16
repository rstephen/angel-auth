import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
} from '../constants/ActionTypes';

export const authenticateRequest = () => ({ type: AUTH_SIGN_IN_REQUEST });

export const authenticateSuccess = (user) => ({ type: AUTH_SIGN_IN_SUCCESS, user });

export const authenticateFailure = (errors) => ({ type: AUTH_SIGN_IN_FAILURE, errors });

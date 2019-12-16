import axios from 'axios';
import {
  AUTH_SIGN_OUT_REQUEST,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE,
} from '../constants/ActionTypes';
import { getSignOutUrl } from '../utils/SessionStorage';

export const signOutRequest = () => ({ type: AUTH_SIGN_OUT_REQUEST });

export const signOutSuccess = () => ({ type: AUTH_SIGN_OUT_SUCCESS });

export const signOutFailure = (errors) => ({ type: AUTH_SIGN_OUT_FAILURE, errors });

const signOut = () => (dispatch) => {
  dispatch(signOutRequest());
  return axios.delete(getSignOutUrl())
    .then(() => dispatch(signOutSuccess()))
    .catch((error) => dispatch(signOutFailure(error.response.data.errors)));
};

export default signOut;

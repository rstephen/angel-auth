import axios from 'axios';
import { getPasswordResetRequestUrl } from '../utils/SessionStorage';
import {
  AUTH_RESET_PASSWORD_REQUEST,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILURE,
} from '../constants/ActionTypes';

const resetPasswordRequest = () => ({ type: AUTH_RESET_PASSWORD_REQUEST });

const resetPasswordSuccess = (user) => ({ type: AUTH_RESET_PASSWORD_SUCCESS, user });

const resetPasswordFailure = (errors) => ({ type: AUTH_RESET_PASSWORD_FAILURE, errors });

const resetPassword = (info) => (dispatch) => {
  dispatch(resetPasswordRequest());
  return axios.put(getPasswordResetRequestUrl(), info)
    .then((resp) => dispatch(resetPasswordSuccess(resp.data)))
    .catch((error) => dispatch(resetPasswordFailure(error.response.data.errors)));
};

export default resetPassword;

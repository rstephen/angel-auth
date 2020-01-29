import axios from 'axios';
import { getPasswordUpdateUrl, getPasswordResetRedirectUrl } from '../utils/SessionStorage';
import {
  AUTH_FORGOT_PASSWORD_REQUEST,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILURE,
} from '../constants/ActionTypes';

const forgotPasswordRequest = () => ({ type: AUTH_FORGOT_PASSWORD_REQUEST });

const forgotPasswordSuccess = () => ({ type: AUTH_FORGOT_PASSWORD_SUCCESS });

const forgotPasswordFailure = (errors) => ({ type: AUTH_FORGOT_PASSWORD_FAILURE, errors });

const forgotPassword = (info) => (dispatch) => {
  dispatch(forgotPasswordRequest());
  return axios.post(
    getPasswordUpdateUrl(),
    { ...info, redirect_url: getPasswordResetRedirectUrl() },
  )
    .then((resp) => dispatch(forgotPasswordSuccess(resp.data)))
    .catch((error) => dispatch(forgotPasswordFailure(error.response.data.errors)));
};

export default forgotPassword;

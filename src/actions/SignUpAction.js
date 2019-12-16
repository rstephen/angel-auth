import axios from 'axios';
import {
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAILURE,
} from '../constants/ActionTypes';
import { getSignUpUrl } from '../utils/SessionStorage';

export const signUpRequest = () => ({ type: AUTH_SIGN_UP_REQUEST });

export const signUpSuccess = (user) => ({ type: AUTH_SIGN_UP_SUCCESS, user });

export const signUpFailure = (errors) => ({ type: AUTH_SIGN_UP_FAILURE, errors });

const signUp = (userInfo) => (dispatch) => {
  dispatch(signUpRequest());
  return axios.post(getSignUpUrl(), userInfo)
    .then((user) => dispatch(signUpSuccess(user.data.data)))
    .catch((error) => dispatch(signUpFailure(error.response.data.errors)));
};

export default signUp;

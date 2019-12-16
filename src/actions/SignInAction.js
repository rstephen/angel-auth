import axios from 'axios';
import {
  authenticateRequest,
  authenticateSuccess,
  authenticateFailure,
} from './AuthenticateAction';
import { getSignInUrl } from '../utils/SessionStorage';

const signIn = (userInfo) => (dispatch) => {
  dispatch(authenticateRequest());
  return axios.post(getSignInUrl(), userInfo)
    .then((user) => dispatch(authenticateSuccess(user.data.data)))
    .catch((error) => console.log(error) || dispatch(authenticateFailure(error.response.data.errors)));
};

export default signIn;

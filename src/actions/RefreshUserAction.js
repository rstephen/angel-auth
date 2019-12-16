import axios from 'axios';
import {
  authenticateFailure,
  authenticateSuccess,
} from './AuthenticateAction';

import { getTokenValidationUrl } from '../utils/SessionStorage';

const refreshUser = () => (dispatch) => (
  axios.get(getTokenValidationUrl())
    .then((response) => dispatch(authenticateSuccess(response.data.data)))
    .catch((error) => dispatch(authenticateFailure(error.response.data.errors)))
);

export default refreshUser;

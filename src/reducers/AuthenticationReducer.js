import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAILURE,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  valid: false,
  errors: null,
  user: null,
  isSignedIn: false,
  passwordResetFailure: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP_REQUEST:
    case AUTH_SIGN_IN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case AUTH_SIGN_UP_SUCCESS:
    case AUTH_RESET_PASSWORD_SUCCESS:
    case AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        valid: true,
        errors: null,
        user: { ...action.user },
        isSignedIn: true,
        passwordResetFailure: false,
      };
    case AUTH_SIGN_IN_FAILURE:
    case AUTH_SIGN_OUT_FAILURE:
    case AUTH_SIGN_UP_FAILURE:
      return {
        ...initialState,
        errors: action.errors ? [...action.errors] : 'unknown',
      };
    case AUTH_SIGN_OUT_SUCCESS:
      return {
        ...initialState,
      };
    case AUTH_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        errors: action.errors ? [...action.errors] : 'unknown',
        passwordResetFailure: true,
      };
    default:
      return state;
  }
};

export default authReducer;

import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  valid: false,
  errors: null,
};

const OAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_IN_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case AUTH_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        valid: true,
        errors: null,
        user: { ...action.user },
        isSignedIn: true,
      };
    case AUTH_SIGN_IN_FAILURE:
    case AUTH_SIGN_OUT_FAILURE:
      return {
        ...initialState,
        errors: action.errors ? [...action.errors] : 'unknown',
      };
    case AUTH_SIGN_OUT_SUCCESS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default OAuthReducer;

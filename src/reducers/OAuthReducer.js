import {
  AUTH_OAUTH_START,
  AUTH_OAUTH_COMPLETE,
  AUTH_OAUTH_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  errors: null,
};

const OAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_OAUTH_START:
      return {
        ...initialState,
        loading: true,
      };
    case AUTH_OAUTH_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case AUTH_OAUTH_FAILURE:
      return {
        ...initialState,
        errors: action.errors ? [...action.errors] : 'unknown',
      };
    default:
      return state;
  }
};

export default OAuthReducer;

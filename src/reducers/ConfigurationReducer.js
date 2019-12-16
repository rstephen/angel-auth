import {
  AUTH_CONFIGURE_SUCCESS,
} from '../constants/ActionTypes';

const initialState = {
  apiUrl: null,
  isConfigured: false,
  tokenValidationPath: null,
  passwordResetPath: null,
  signOutPath: null,
  signInPath: null,
  authProviderPaths: {},
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CONFIGURE_SUCCESS:
      return {
        ...state,
        ...action.config,
        isConfigured: true,
      };
    default:
      return state;
  }
};

export default configReducer;

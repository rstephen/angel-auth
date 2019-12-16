import * as types from '../../constants/ActionTypes';
import reducer from '../ConfigurationReducer';

const initialState = {
  apiUrl: null,
  isConfigured: false,
  tokenValidationPath: null,
  passwordResetPath: null,
  signOutPath: null,
  signInPath: null,
  authProviderPaths: {},
};

describe('ConfigurationReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('should handle AUTH_CONFIGURE_SUCCESS', () => {
    expect(reducer(initialState, {
      type: types.AUTH_CONFIGURE_SUCCESS,
      config: { apiUrl: 'hhh' },
    })).toEqual({
      apiUrl: 'hhh',
      isConfigured: true,
      tokenValidationPath: null,
      passwordResetPath: null,
      signOutPath: null,
      signInPath: null,
      authProviderPaths: {},
    });
  });

});

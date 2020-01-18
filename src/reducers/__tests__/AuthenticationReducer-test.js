import * as types from '../../constants/ActionTypes';
import reducer, { initialState } from '../AuthenticationReducer';

describe('AuthenticationReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('should handle AUTH_SIGN_IN_REQUEST', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SIGN_IN_REQUEST,
    })).toEqual({
      loading: true, passwordResetFailure: false, valid: false, errors: null, isSignedIn: false, user: {},
    });
  });

  it('should handle AUTH_SIGN_IN_SUCCESS', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SIGN_IN_SUCCESS,
      user: { f: '' },
    })).toEqual({
      loading: false, passwordResetFailure: false, valid: true, errors: null, isSignedIn: true, user: { f: '' },
    });
  });

  it('should handle AUTH_SIGN_IN_FAILURE', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SIGN_IN_FAILURE,
      errors: ['bad ness'],
    })).toEqual({
      loading: false, passwordResetFailure: false, valid: false, errors: ['bad ness'], isSignedIn: false, user: {},
    });
  });

  it('should handle AUTH_SIGN_OUT_SUCCESS', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SIGN_OUT_SUCCESS,
    })).toEqual(initialState);
  });
});

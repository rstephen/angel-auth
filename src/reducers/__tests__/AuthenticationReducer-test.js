import * as types from '../../constants/ActionTypes';
import reducer from '../AuthenticationReducer';

const initialState = {
  loading: false,
  valid: false,
  errors: null,
  user: null,
  loggedIn: false,
  credentials: null,
};

describe('AuthenticationReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('should handle AUTH_SIGN_IN_REQUEST', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SIGN_IN_REQUEST,
    })).toEqual({
      loading: true, valid: false, errors: null, loggedIn: false, credentials: null, user: null,
    });
  });

  it('should handle AUTH_SIGN_IN_SUCCESS', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SIGN_IN_SUCCESS,
      user: { f: '' },
    })).toEqual({
      loading: false, valid: true, errors: null, loggedIn: true, credentials: null, user: { f: '' },
    });
  });

  it('should handle AUTH_SIGN_IN_FAILURE', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SIGN_IN_FAILURE,
      errors: ['bad ness'],
    })).toEqual({
      loading: false, valid: false, errors: ['bad ness'], loggedIn: false, credentials: null, user: null,
    });
  });

  it('should handle AUTH_SIGN_OUT_SUCCESS', () => {
    expect(reducer(initialState, {
      type: types.AUTH_SIGN_OUT_SUCCESS,
    })).toEqual(initialState);
  });

  it('should handle AUTH_UPDATE_CREDENTIALS', () => {
    expect(reducer({ ...initialState, user: {}, loggedIn: true, loading: false, valid: true }, {
      type: types.AUTH_UPDATE_CREDENTIALS,
      credentials: { f: '' },
    })).toEqual({
      loading: false, valid: true, errors: null, loggedIn: true, credentials: { f: '' }, user: { },
    });
  });
});

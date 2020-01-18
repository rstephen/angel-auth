import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../constants/ActionTypes';
import configureAuth from '../ConfigurationAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('ConfigurationAction', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); store.clearActions(); });

  it('creates AUTH_UPDATE_CREDENTIALS', () => {
    const config = {
      apiUrl: 'https://foo.com',
      tokenValidationPath: '/api/auth/validate_token',
      passwordResetPath: '/api/auth/password',
      signInPath: '/api/auth/sign_in',
      signOutPath: '/api/auth/sign_out',
      authProviderPaths: {
        linkedin: '/api/auth/linkedin',
        facebook: '/api/auth/facebook',
        twitter: '/api/auth/twitter',
      },
    };

    const expectedActions = [
      {
        type: types.AUTH_CONFIGURE_SUCCESS,
        config: {
          apiPath: '',
          passwordUpdatePath: '/auth/password',
          signUpPath: '/auth',
          tokenFormat: {
            'access-token': '{{ access-token }}',
            client: '{{ client }}',
            expiry: '{{ expiry }}',
            'token-type': 'Bearer',
            uid: '{{ uid }}',
          },
          cookieProps: {
            expires: 14,
            path: '/',
          },
          ...config,
        },
      },
    ];

    store.dispatch(configureAuth(config));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });

  it('creates AUTH_CONFIGURE_FAILURE for missing apiUrl', () => {
    const config = {
      // apiUrl: 'https://foo.com',
      tokenValidationPath: '/api/auth/validate_token',
      passwordResetPath: '/api/auth/password',
      signInPath: '/api/auth/sign_in',
      signOutPath: '/api/auth/sign_out',
      authProviderPaths: {
        linkedin: '/api/auth/linkedin',
        facebook: '/api/auth/facebook',
        twitter: '/api/auth/twitter',
      },
    };

    const expectedActions = [
      { type: types.AUTH_CONFIGURE_FAILURE, error: 'apiUrl is required' },
    ];

    store.dispatch(configureAuth(config));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
  });
});

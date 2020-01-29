import moxios from 'moxios';
import * as types from '../../constants/ActionTypes';
import action from '../ResetPasswordAction';
import setup from './config';

const { store } = setup();

const response = {
  success: true,
  data: {
    id: 162,
    email: 'foo@email.com',
    phone_number: null,
    created_at: '2018-09-06T19:59:01.620Z',
    slug: 'foo',
  },
  message: 'Your password has been successfully updated.',
};

describe('SignIn', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); store.clearActions(); });

  it('creates AUTH_SIGN_IN_SUCCESS', () => {
    moxios.stubRequest('/api/auth/password?config_name=default', { status: 200, response });

    const expectedActions = [
      { type: types.AUTH_RESET_PASSWORD_REQUEST },
      { type: types.AUTH_RESET_PASSWORD_SUCCESS, user: response.data },
    ];

    return store.dispatch(action({ reset_password_token: '8CtKUjXkaao_ceofYvjS', password: '123123123', password_confirmation: '123123123' }))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
      });
  });


  it('creates AUTH_SIGN_IN_FAILURE', () => {
    moxios.stubRequest('/api/auth/password?config_name=default', { status: 401, response: { errors: ['bad dude'] } });

    const expectedActions = [
      { type: types.AUTH_RESET_PASSWORD_REQUEST },
      { type: types.AUTH_RESET_PASSWORD_FAILURE, errors: ['bad dude'] },
    ];

    return store.dispatch(action({ reset_password_token: '8CtKUjXkaao_ceofYvjS', password: '123123123', password_confirmation: '123123123' }))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
      });
  });
});

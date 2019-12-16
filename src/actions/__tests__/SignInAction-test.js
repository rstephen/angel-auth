import moxios from 'moxios';
import * as types from '../../constants/ActionTypes';
import signIn from '../SignInAction';
import setup from './config';

const { store } = setup();

describe('SignIn', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); store.clearActions(); });

  it('creates AUTH_SIGN_IN_SUCCESS', () => {
    moxios.stubRequest('/api/auth/sign_in', { status: 200, response: { data: { email: 'foo@goo.com' } } });

    const expectedActions = [
      { type: types.AUTH_SIGN_IN_REQUEST },
      { type: types.AUTH_SIGN_IN_SUCCESS, user: { email: 'foo@goo.com' } },
    ];

    return store.dispatch(signIn({ email: 'foo@goo.com', password: 'pw' }))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
      });
  });


  it('creates AUTH_SIGN_IN_FAILURE', () => {
    moxios.stubRequest('/api/auth/sign_in', { status: 401, response: { errors: ['bad dude'] } });

    const expectedActions = [
      { type: types.AUTH_SIGN_IN_REQUEST },
      { type: types.AUTH_SIGN_IN_FAILURE, errors: ['bad dude'] },
    ];

    return store.dispatch(signIn({ email: 'foo@goo.com', password: 'pw' }))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
      });
  });
});

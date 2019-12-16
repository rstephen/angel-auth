import moxios from 'moxios';
import * as types from '../../constants/ActionTypes';
import signOut from '../SignOutAction';
import setup from './config';

const { store } = setup();

describe('SignOut', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); store.clearActions(); });

  it('creates AUTH_SIGN_OUT_SUCCESS', () => {
    moxios.stubRequest('/api/auth/sign_out', { status: 200, response: {} });

    const expectedActions = [
      { type: types.AUTH_SIGN_OUT_REQUEST },
      { type: types.AUTH_SIGN_OUT_SUCCESS },
    ];

    return store.dispatch(signOut())
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
      });
  });


  it('creates AUTH_SIGN_IN_FAILURE', () => {
    moxios.stubRequest('/api/auth/sign_out', { status: 401, response: { errors: ['bad dude'] } });

    const expectedActions = [
      { type: types.AUTH_SIGN_OUT_REQUEST },
      { type: types.AUTH_SIGN_OUT_FAILURE, errors: ['bad dude'] },
    ];

    return store.dispatch(signOut({ email: 'foo@goo.com', password: 'pw' }))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
      });
  });
});

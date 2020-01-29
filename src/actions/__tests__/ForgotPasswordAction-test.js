import moxios from 'moxios';
import * as types from '../../constants/ActionTypes';
import action from '../ForgotPasswordAction';
import setup from './config';

const { store } = setup();

describe('ForgotPasswordAction', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); store.clearActions(); });

  it('creates AUTH_FORGOT_PASSWORD_REQUEST', async (done) => {
    const expectedActions = [
      { type: types.AUTH_FORGOT_PASSWORD_REQUEST },
      { type: types.AUTH_FORGOT_PASSWORD_SUCCESS },
    ];

    store.dispatch(action({ email: 'foo@goo.com' }));

    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({ status: 200, response: {} }).then(() => {
        expect(JSON.parse(req.config.data)).toEqual({
          email: 'foo@goo.com',
          redirect_url: 'http://localhost/',
        });
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
        done();
      });
    });
  });


  it('creates AUTH_FORGOT_PASSWORD_FAILURE', () => {
    moxios.stubRequest('/auth/password', { status: 401, response: { errors: ['bad dude'] } });

    const expectedActions = [
      { type: types.AUTH_FORGOT_PASSWORD_REQUEST },
      { type: types.AUTH_FORGOT_PASSWORD_FAILURE, errors: ['bad dude'] },
    ];

    return store.dispatch(action({ email: 'foo@goo.com' }))
      .then(() => {
        expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
        expect(store.getActions()[1]).toEqual(expectedActions[1]);
      });
  });
});

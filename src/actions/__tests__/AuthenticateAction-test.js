import * as types from '../../constants/ActionTypes';
import * as actions from '../AuthenticateAction';
import setup from './config';

const { store } = setup();

describe('AuthenticationAction', () => {
  afterEach(() => { store.clearActions(); });

  it('creates AUTH_SIGN_IN_REQUEST', () => {
    const expectedActions = [
      { type: types.AUTH_SIGN_IN_REQUEST },
    ];

    store.dispatch(actions.authenticateRequest());
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
  });


  it('creates AUTH_SIGN_IN_SUCCESS', () => {
    const expectedActions = [
      { type: types.AUTH_SIGN_IN_SUCCESS, user: { email: 'foo@goo.com' } },
    ];

    store.dispatch(actions.authenticateSuccess({ email: 'foo@goo.com' }));
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    expect(store.getActions()[1]).toEqual(expectedActions[1]);
  });

  it('creates AUTH_SIGN_IN_FAILURE', () => {
    const expectedActions = [
      { type: types.AUTH_SIGN_IN_FAILURE, errors: ['bad dude'] },
    ];

    store.dispatch(actions.authenticateFailure(['bad dude']));
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    expect(store.getActions()[1]).toEqual(expectedActions[1]);
  });
});

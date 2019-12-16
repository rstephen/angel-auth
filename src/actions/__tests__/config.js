import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import configure from '../../utils/SessionStorage';

const setup = ({ storeProps = {} } = {}) => {
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

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(storeProps);

  configure(config);

  return { store };
};

it.todo('tests');

export default setup;

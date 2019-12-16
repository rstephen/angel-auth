import axios from 'axios';
import authInterceptor from '../AuthInterceptor';
import configure from '../SessionStorage';

describe('AuthenticationAction', () => {
  it('sets up baseUrl and headers', () => {
    configure({ apiUrl: 'https://foo.com' });
    authInterceptor();
    expect(axios.defaults.baseURL).toEqual('https://foo.com');
    expect(axios.defaults.headers.post).toEqual({ 'Content-Type': 'application/json' });
    expect(axios.defaults.headers.put).toEqual({ 'Content-Type': 'application/json' });
    expect(axios.defaults.headers.patch).toEqual({ 'Content-Type': 'application/json' });
  });
});
# angel-auth

Takes great inspiration from [redux-auth](https://github.com/lynndylanhurley/redux-auth).


```
import { configureAuth } from 'angel-auth';

...

  store.dispatch(configureAuth({
    apiUrl: process.env.REACT_APP_API_URL,
    apiPath: '/api',
    authProviderPaths: {
      linkedin: '/auth/linkedin',
      facebook: '/auth/facebook',
      twitter: '/auth/twitter',
    },
  }))
```


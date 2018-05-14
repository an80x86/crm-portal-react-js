// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';

export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
      const { username, password } = params;
      const request = new Request('http://localhost:49793/Handler.ashx?cmd=dologin', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: new Headers({ 'Content-Type': 'application/json' }),
      })
      return fetch(request)
          .then(response => {
              //console.log("1 " + response);
              return response.json();
          })
          .then((response) => {
              if (response) {
              localStorage.setItem('username', username);
              //console.log("2 " + response);
            } else {
              return Promise.reject();
            }
          });
    }

    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('username');
        return Promise.resolve();
    }

    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }

    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    }

    return Promise.reject('Unknown method');
};

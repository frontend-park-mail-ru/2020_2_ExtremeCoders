import { Paths } from '../Constants.js';

export default function myFetch(url, method, body) {
  let token = document.cookie.match(/token=([\w-]+)/);
  if (token === null) {
    token = '';
  } else {
    token = String(token[0] || token[1]);
    token = token.replace('token=', '');
  }
  console.log('req', Paths.baseUrl + url);
  return fetch(Paths.baseUrl + url,
    {
      method,
      mode: 'cors',
      credentials: 'include',
      headers: {
        csrf_token: token,
      },
      body,
    });
}

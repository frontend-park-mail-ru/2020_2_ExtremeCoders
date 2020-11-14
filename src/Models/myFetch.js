import { Paths } from '../Constants.js';

export default function myFetch(url, method, body) {
  let token = String(document.cookie.match(/token=([\w-]+)/)[0]);
  console.log(token);
  token = token.replace('token=', '');
  console.log(token);
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

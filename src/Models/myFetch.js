import { Paths } from '../Constants.js';

export default function myFetch(url, method, body) {
  let token = document.cookie.match(/token=([\w-]+)/);
  if (token === null) {
    token = '';
  } else {
    token = String(token);
    console.log("TOKEN:::",token);
    token = token.replace('token=', '');
    console.log(token);
  }
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

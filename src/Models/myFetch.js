import { Paths } from '../Constants.js';

export default function myFetch(url, method, body) {
  let token = document.cookie.match(/token=([\w-]+)/);
  console.log("TOOOOOOKEEEEEENNNNN::::::::::",token);
  if (token === null) {
    token === '';
  } else {
    token = String(token[0] || token[1]);
    console.log(token);
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

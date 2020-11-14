import { Paths } from '../Constants.js';

export default function myFetch(url, method, body) {
  let token = document.cookie.match(/token=([\w-]+)/);
  console.log("GOT:", token)
  if (token===null){
      console.log("NULL")
      token=""
  } else{
      token=String(token[0])
      console.log("NOT NULL", token)
  }
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

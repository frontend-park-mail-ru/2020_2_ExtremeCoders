import { Paths } from '../Constants.js';

export default function myFetch(url, method, body) {
  return fetch(Paths.baseUrl + url,
    {
      method,
      mode: 'cors',
      credentials: 'include',
      csrf_token: document.cookie.match(/CSRF-TOKEN=([\w-]+)/),
      body,
    });
}

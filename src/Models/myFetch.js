export default function myFetch(url, method, body) {
  return fetch(url,
    {
      method,
      mode: 'cors',
      credentials: 'include',
      body,
    });
}

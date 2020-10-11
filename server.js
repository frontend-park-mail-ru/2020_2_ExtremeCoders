/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.json());
const req = require('request');

app.use(express.static(`${__dirname}/public`));
/**
 * send get request
 */
app.get('/', (request, response) => {
  console.log(request.method, request.url);
  response.redirect('public/index.html');
  // response.send(request.url)
});
/**
 * send get request with /profile url on go server
 */
app.get('/profile', (request, response) => {
  req.get({
    url: `http://localhost:8080${request.url}`,
  },
  (err, body) => {
    if (err) response.status(500).send({ message: err });
    else response.send(body);
  });
});
/**
 * send post request on go server
 */
app.post(/.*$/, (request, response) => {
  req.post({
    url: `http://localhost:8080${request.url}`,
    form: request.body,
  },
  (err, resp, body) => {
    if (err) response.status(500).send({ message: err });
    else response.send(body);
  });
});

app.listen(3000);

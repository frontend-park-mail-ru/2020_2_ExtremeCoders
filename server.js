/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.json());
const req = require('request');

//app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/MVC`));
/**
 * send get request
 */
app.get('/', (request, response) => {
  console.log(request.method, request.url);
  response.redirect('MVC/index.html');
});
/**
 * send get request with /profile.css url on go server
 */
app.get('/profile.css', (request, response) => {
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

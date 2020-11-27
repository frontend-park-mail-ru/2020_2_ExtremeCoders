/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.json());
const req = require('request');

//app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/src`));
/**
 * send get request
 */
app.get(/.*$/, (request, response) => {
  console.log(request.method, request.url);
  response.sendFile(__dirname+'/src/index.html');

});

app.listen(3000);

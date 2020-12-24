/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.json());
const req = require('request');

//app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/src`));
app.use(express.static(`${__dirname}/static/dist`));

/**
 * send get request for sw.js
 */
app.get(/sw.js$/, (request, response) => {
  console.log("sw.js")
  response.sendFile(`${__dirname}/src/sw.js`);
});

/**
 * send get request
 */
app.get(/.*$/, (request, response) => {
  // response.sendFile(__dirname+'/src/index.html');
  console.log("not sw.js")

  response.sendFile(`${__dirname}/static/dist/index.html`);
});

app.listen(80);

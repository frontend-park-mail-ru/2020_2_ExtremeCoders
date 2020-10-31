/* eslint-disable no-console */
const express = require('express');

const app = express();
app.use(express.json());
const req = require('request');

//app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/MVC`));

/* final catch-all route to index.html defined last */
app.get('/*', (req, res) => {
  console.log(req.method, req.url);
  res.sendFile(__dirname + '/MVC/index.html');
})


app.listen(3000);

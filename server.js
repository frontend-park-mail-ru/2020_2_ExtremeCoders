
const express = require("express");

const app = express();
const req = require('request');
fetch = require('node-fetch')


app.use(express.static(__dirname + "/public"));

app.get("/", function (request, response) {
    console.log(request.method, request.url)
    response.redirect("public/index.html")


    // response.send(request.url)
});

app.post(/.*$/, (request, response) => {
    console.log("HUI::::::::::::",request.method, request.url, request)
    req.post( {
            url:'http://localhost:8080' + request.url,
            form: request.body
        }
        , (err, resp, body) => {

            if (err)
                return response.status(500).send({message: err})
            response.send(body)
        })
});

app.listen(3000);
const express = require("express");

const app = express();
const req = require('request');
fetch = require('node-fetch')


app.use(express.static(__dirname + "/public"));

app.get("/", function (request, response) {
    response.redirect("public/index.html")
    console.log("Get:", request.url)

    // response.send(request.url)
});

app.post(/.*$/, (request, response) => {
    req.post( {
            url:'http://localhost:8080' + request.url,
            form: {
                login: 'login1',
                password: 'password1',
            }
        }
        , (err, resp, body) => {
            console.log(request.body)
            if (err)
                return response.status(500).send({message: err})
            response.send(body)
        })
});

app.listen(3000);
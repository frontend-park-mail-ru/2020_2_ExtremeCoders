const express = require('express');

const app = express();
app.use(express.json());
const req = require('request');
fetch = require('node-fetch')


app.use(express.static(__dirname + '/public'));
/**
 * send get request
 */
app.get('/', function (request, response) {
    console.log(request.method, request.url)
    response.redirect("public/index.html")
    // response.send(request.url)
});
/**
 * send get request with /profile url on go server
 */
app.get('/profile', function (request, response){
    console.log("KEK::::::::::::",request.method, request.url, request.body)
    req.get( {
            url:'http://localhost:8080' + request.url,
        }
        , (err, resp, body) => {

            if (err)
                return response.status(500).send({message: err})
            response.send(body)
        })
});
/**
 * send post request on go server
 */
app.post(/.*$/, (request, response) => {
    console.log('KEK::::::::::::',request.method, request.url, request.body)
    req.post( {
            url:'http://localhost:8080' + request.url,
            form: request.body
        }
        , (err, resp, body) => {

            if (err)
                return response.status(500).send({message: err})
            // resp.setCookie()
            response.send(body)
            //console.log("LOL::::::::::::",resp.cookie, body.cookie)
        })
});

app.listen(3000);
const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
    response.redirect("public/index.html")
    console.log("Get:",request.url)

   // response.send(request.url)
});


app.post(/.*$/, function(request, response){

    //response.send("POST " + request.url)
    let redirectUrl = "http://127.0.0.1:8000" + request.url;
    console.log(request.method, redirectUrl);
    response.redirect(redirectUrl);
});

app.listen(3000);

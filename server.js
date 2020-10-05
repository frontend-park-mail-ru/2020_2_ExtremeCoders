const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function(request, response){
    response.redirect("public/index.html")
    console.log(request.url)

   // response.send(request.url)
});


app.post(/.*$/, function(request, response){
    console.log("POST", console.log(request.url))
    //response.send("POST " + request.url)
    response.redirect("http://localhost:8080/")

});

app.listen(3000);

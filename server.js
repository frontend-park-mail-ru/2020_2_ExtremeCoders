// http.createServer(function(request, response){
//
//     console.log("Url: " + request.url);
//     console.log("Тип запроса: " + request.method);
//     if(request.url==="/proxi"){
//         response.statusCode = 302; // временная переадресация
//         // на адрес localhost:3000/newpage
//         response.setHeader("Location", ":8080/newpage");
//         //response.write("METHOD "+request.method)
//     }
//
//     console.log("User-Agent: " + request.headers["user-agent"]);
//     console.log("Все заголовки");
//     console.log(request.headers);
//
//
//     console.log(`Запрошенный адрес: ${request.url}`);
//     // получаем путь после слеша
//     let filePath = "public/"+request.url.substr(1);
//     if(filePath==="public/" ||filePath==="public" ){
//         filePath="public/index.html"
//     }
//     // смотрим, есть ли такой файл
//     fs.access(filePath, fs.constants.R_OK, err => {
//         // если произошла ошибка - отправляем статусный код 404
//         if(err){
//             response.statusCode = 404;
//             response.end("Resourse not found!");
//         }
//         else{
//             fs.createReadStream(filePath).pipe(response);
//         }
//     });
//
// }).listen(3000);

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
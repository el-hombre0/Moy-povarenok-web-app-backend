import express from "express";

const hostname = '127.0.0.1';
const port = 8080;

const app = express();
app.get('/', (req, res) => {
    res.send('11Hello world');
});

app.listen(port, (err) => { 
    if(err){
        return console.log(err);
    }
    else{
        console.log(`Сервер работает по адресу: http://${hostname}:${port}/`);
    }
});



// const server = http1.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/html; charset=utf-8;");
//     res.write("<!DOCTYPE html>");
//     res.write("<html>");
//     res.write("<head>");
//     res.write("<title>Hello Node.js</title>");
//     res.write("<meta charset=\"utf-8\" />");
//     res.write("</head>");
//     res.write("<body><h2>Привет миг</h2>");
//     res.write("<h2>Дом</h2>")
//     res.write("</body>")
//     res.write("</html>");

//     console.log(`URL: ${req.url}`);
//     console.log(`Тип запроса: ${req.method}`);
//     console.log(`User-Agent: ${req.headers["user-agent"]}`);
//     console.log("Все заголовки:");
//     console.log(req.headers);
//     res.end();
// });

// server.listen(port, hostname, () => {
//     console.log(`Сервер работает по адресу: http://${hostname}:${port}/`);
// });
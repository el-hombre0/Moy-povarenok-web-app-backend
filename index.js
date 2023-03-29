import express from 'express';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const hostname = '127.0.0.1'; // Хост
const port = 8080; // Порт

// Подключение к базе данных MongoDB
mongoose.connect("mongodb://admin:1q2w3e4r@127.0.0.1:27017/restaurant",)
.then(() => {console.log('DB is ok')})
.catch(() => console.log('DB error', err));

// Подключение Express
const app = express();

app.use(express.json()); // Для чтения приходящих http-запросов в json

// Главная страница
app.get('/', (req, res) => {
    res.send('Hello world111');
});

// Авторизация
app.post('/auth/login', (req, res) => {
    // Создание jwt токена
    const token = jwt.sign(
        { 
            email: req.body.email,
            fullName: req.body.name,
        },
        'secret123'
    );

    res.json({
        success: true,
        token
    });
    console.log(req.body);
});


// Запуск сервера при отсутствии ошибок
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
import express from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

const hostname = '127.0.0.1'; // Хост
const port = 8080; // Порт

// Подключение к базе данных MongoDB
mongoose.connect("mongodb://admin:1q2w3e4r@127.0.0.1:27017/restaurant",)
    .then(() => { console.log('DB is ok') })
    .catch(() => console.log('DB error', err));

// Подключение Express
const app = express();

app.use(express.json()); // Для чтения приходящих http-запросов в json

// Главная страница
app.get('/', (req, res) => {
    res.send('Hello world111');
});

/**
 * Регистрация
 * @async
 */
app.post('/auth/register', registerValidation, UserController.register);

/**
 * Авторизация
 * @async
 */
app.post('/auth/login', UserController.login);


/**
 * Получение информации о пользователе 
 * @param checkAuth Декодирование jwt пользователя
*/
app.get('/auth/me', checkAuth, UserController.getMe);


/** Запуск сервера */
app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    else {
        console.log(`Сервер работает по адресу: http://${hostname}:${port}/`);
    }
});

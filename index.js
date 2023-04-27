import express from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import UserModel from './models/User.js';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import checkAuth from './utils/checkAuth.js';

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
app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        // Валидация данных
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        // Шифрование пароля
        const password = req.body.password;
        if (password === undefined || password === null) {
            return "password is undefined or null";
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Создание документа - модели пользователя
        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        });

        // Сохранение документа
        const user = await doc.save();

        /** Шифрование в jwt-токене id пользователя */
        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '10d'
            },
        );

        /** Деструктуризация для того, чтобы убрать passwordHash из вывода */
        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Registration is failed",
            error,
        });
    }

});

/**
 * Авторизация
 * @async
 */
app.post('/auth/login', async (req, res) => {
    try{
        /** Поиск пользователя в БД по email */
        const user = await UserModel.findOne({email: req.body.email});

        if (!user){
            return res.status(401).json({
                message: 'User is not found',
            });
        }

        /** Проверка сходимости пароля */
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPass){
            return res.status(401).json({
                message: 'Incorrect login or password',
            });
        }

        /** Шифрование в jwt-токене id пользователя */
        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '10d'
            },
        );

        /** Деструктуризация для того, чтобы убрать passwordHash из вывода */
        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Authorisation is failed",
            error,
        });
    }
});


/**Получение информации о пользователе */
app.get('/auth/me', checkAuth, (req, res) => {
    try{

    } catch (error) {}
});


/** Запуск сервера */
app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    else {
        console.log(`Сервер работает по адресу: http://${hostname}:${port}/`);
    }

});

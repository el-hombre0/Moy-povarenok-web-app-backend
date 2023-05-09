import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import graphqlHTTP from "express-graphql";
import buildSchema from "graphql";

import {
  registerValidation,
  loginValidation,
  dishCreateValidation,
} from "./validations.js";

import { UserController, DishController } from "./controllers/index.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

const hostname = "127.0.0.1";
const port = 8080;

/** Подключение к базе данных MongoDB */
mongoose
  .connect("mongodb+srv://admin:1q2w3e4r@cluster0.bnsol1r.mongodb.net/moy-povarenok?retryWrites=true&w=majority")
  .then(() => {
    console.log("DB is ok");
  })
  .catch(() => console.log("DB error", err));

/** Подключение Express */
const app = express();

/** Хранилище для изображений */
const storage = new multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

/** Передача хранилища в multer */
const upload = multer({ storage });

/** Чтение приходящих http-запросов в json */
app.use(express.json());

/** Отключение механизма блокировки доступа с другого адреса CORS */
app.use(cors());

/** Выдача статичных файлов по запросу */
app.use("/uploads", express.static("uploads"));

/** Главная страница */
app.get("/", (req, res) => {
  res.send("Hello world111");
});

/** Маршрутизация блюд (CRUD) */
app.get("/dishes", DishController.getAll);
app.get("/dishes/:id", DishController.getOne);
app.post(
  "/dishes",
  checkAuth,
  dishCreateValidation,
  handleValidationErrors,
  DishController.create
);
app.delete("/dishes/:id", checkAuth, DishController.remove);
app.patch(
  "/dishes/:id",
  checkAuth,
  dishCreateValidation,
  handleValidationErrors,
  DishController.update
);

app.get("/dishes/tags", DishController.getLastTags);

/** Маршрут для получения 5 последних тэгов*/
app.get("/tags", DishController.getLastTags);

/** Регистрация */
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

/** Авторизация */
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

/** Получение информации о пользователе */
app.get("/auth/me", checkAuth, UserController.getMe);

/** Маршрут для загрузки изображений */
app.post("/uploads", checkAuth, upload.single("image"), (req, res) => {
  /** Пользователю отдаётся путь к загруженному им файлу*/
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

/** Запуск сервера */
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log(`Сервер работает по адресу: http://${hostname}:${port}/`);
  }
});

// GRAPHQL API


// let schema = buildSchema(`
//   type Query {
//     postTitle: String,
//     blogTitle: String
//   }
// `);

// let root = {
//     postTitle: () => {
//         return 'Build a Simple GraphQL Server With Express and NodeJS';
//     },
//     blogTitle: () => {
//         return 'scotch.io';
//     }
// }

// app.use('/', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
// }));
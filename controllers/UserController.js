import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';
import Role from '../models/Role.js';

export const register = async (req, res) => {
    try {   
        /** Шифрование пароля */
        const password = req.body.password;
        if (password === undefined || password === null) {
            return "password is undefined or null";
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const userRole = await Role.findOne({value: "USER"});
        /** Создание документа - модели пользователя */ 
        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
            roles: [userRole.value],
        });

        /** Сохранение документа */
        const user = await doc.save();

        /** Шифрование в jwt-токене id пользователя */
        const token = jwt.sign(
            {
                _id: user._id,
                roles: user.roles,
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
};

export const login = async (req, res) => {
    try{
        // const roleUser = new Role();
        // const roleAdmin = new Role({value: 'ADMIN'});
        // await roleUser.save();
        // await roleAdmin.save();

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
                roles: user.roles,
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
            message: "Authorization is failed",
            error,
        });
    }
};

export const getMe = async (req, res) => {
    try{
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        } else {
            /** Деструктуризация для того, чтобы убрать passwordHash из вывода */
            const {passwordHash, ...userData} = user._doc;

            return res.json({
                ...userData,
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No access'
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const users = await UserModel.find();
        if (!users) {
            return res.status(404).json({
                message: 'There is no any users',
            });
        } else {
            return res.json({
                users,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No access'
        });
    }
}
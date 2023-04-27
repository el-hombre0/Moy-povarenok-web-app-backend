import jwt from 'jsonwebtoken';


/**
 * Проверка авторизации пользователя
 */
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace('/Bearer\s?/', '');
    console.log(token);
    res.send(token);
};
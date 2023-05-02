import { validationResult } from 'express-validator';

/** 
 * Проверка корректности вадидации контроллера пользователя 
 * @param next Функция перехода к следующему callback
*/
export default(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    };
    next();
};
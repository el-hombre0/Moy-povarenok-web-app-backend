import jwt from 'jsonwebtoken';


/**
 * Проверка авторизации
 * @detail Декодирование токена
 * @param next Функция перехода к следующему callback
 */
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            req.userId = decoded._id;
            next();
            
        } catch (error) {
            return res.status(403).json({
                message: 'Access denied',
            });
        }
    } else{
        return res.status(403).json({
            message: 'Authentication faild! Try again later',
        });
    }
};
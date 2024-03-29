import { body } from 'express-validator';

/** Валидация регистрации */
export const registerValidation = [
    body('fullName', 'The name\'s length must be at least 2 characters!').isLength({ min: 2}),
    body('email', 'The email must be in proper format!').isEmail(),
    body('password', 'The password\'s length must be at least 2 characters!').isLength({ min: 5}),
    body('avatarUrl', 'The avatar must be a URL!').optional().isURL(),
];

/** Валидация авторизации */
export const loginValidation = [
    body('email', 'The email must be in proper format!').isEmail(),
    body('password', 'The password\'s length must be at least 5 characters!').isLength({ min: 5}),
];

/** Валидация создания блюда */
export const dishCreateValidation = [
    body('title', 'The title\'s length must be at least 2 characters!').isLength({min: 2}).isString(),
    body('cookingtime', 'The cooking time must be an integer!').isInt(),
    body('description', 'The description\'s length must be at least 10 characters!').isLength({min: 10}).isString(),
    body('imageUrl', 'The image must be a string!').optional().isString(),
    body('ingredients', 'The ingredients must be an array!').optional().isArray(),
    body('tags', 'The tags must be an array!').optional().isArray()
];
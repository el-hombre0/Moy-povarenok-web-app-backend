import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'The email must be in proper format!').isEmail(),
    body('password', 'The password\'s length must be at least 2 characters!').isLength({ min: 5}),
    body('fullname', 'The name\'s length must be at least 2 characters!').isLength({ min: 2}),
    body('avatarUrl', 'The avatar must be a URL!').optional().isURL(),
];

// Example of using express-validator for createUser
const { body, validationResult } = require('express-validator');

const validateUserData = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorResponse = errors.array().map(error => ({
            field: error.param,
            message: error.msg,
        }));

        return res.status(400).json({ success: false, errors: errorResponse });
    }

    next();
};

exports.validateUserCreation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('age').isInt().withMessage('Age must be a number'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phoneNo').isMobilePhone().withMessage('Invalid phone number'),
    body('gender').isIn(['male', 'female', 'others']).withMessage('Invalid gender'),
    body('qualification').trim().notEmpty().withMessage('Qualification is required'),
    validateUserData,
];

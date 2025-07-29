const {body, validationResult} = require('express-validator')

const validate = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('author').trim().notEmpty().withMessage('Author is required'),
    body('price').isInt({min: 0}).withMessage('Price must be a positive integer'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render(req.viewName, {
                errors: errors.array(), oldData: req.body
            });
        }
        next();
    }
]

module.exports = validate;

const { body, sanitizeBody, validationResult } = require('express-validator')
const {
    validationErrorWithData,
    successResponseWithData,
    ConflictResponse,
    ErrorResponse,
} = require('../helpers/apiResponse')
const bcrypt = require('bcrypt')
const UserSchemaModel = require('../models/userSchema')

exports.regsister = [
    body('firstName')
        .isLength({ min: 1 })
        .trim()
        .withMessage('First name must be specified')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),

    body('lastName')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Last name must be specified')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),

    body('email')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Should be of valid email address'),

    body('password')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Passwords must be of 6 characters or greater'),

    sanitizeBody('firstName').escape(),
    sanitizeBody('lastName').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('password').escape(),

    (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return validationErrorWithData(
                    res,
                    'Validation Error',
                    errors.array()
                )
            else {
                UserSchemaModel.findOne(
                    { email: req.body.email },
                    (err, data) => {
                        if (data !== null) {
                            return ConflictResponse(res, 'Email already exists')
                        } else {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                const { firstName, lastName, email } = {
                                    ...req.body,
                                }
                                var user = new UserSchemaModel({
                                    firstName,
                                    lastName,
                                    email,
                                    password: hash,
                                })
                                user.save(function (err) {
                                    if (err) {
                                        return apiResponse.ErrorResponse(
                                            res,
                                            err
                                        )
                                    }
                                    let userData = {
                                        _id: user._id,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email,
                                    }
                                    return successResponseWithData(
                                        res,
                                        'Registration Success.',
                                        userData
                                    )
                                })
                            })
                        }
                    }
                )
            }
        } catch (error) {
            return ErrorResponse(
                res,
                `Error occured while registration---${error.toString()}`
            )
        }
    },
]

// const UserModel = require('../models/UserModel')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
const { validationErrorWithData } = require('../helpers/apiResponse')

//helper file to prepare responses.
// const apiResponse = require('../helpers/apiResponse')
// const utility = require('../helpers/utility')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const mailer = require('../helpers/mailer')
// const { constants } = require('../helpers/constants')

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */

exports.login = [
    body('email')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Email must be specified.')
        .isEmail()
        .withMessage('Email must be a valid email address.'),
    body('password')
        .isLength({ min: 1 })
        .trim()
        .withMessage('Password must be specified.'),
    sanitizeBody('email').escape(),
    sanitizeBody('password').escape(),

    (req, res) => {
        const errors = validationResult(req)
        return validationErrorWithData(res, 'Validation Error.', errors.array())
    },
]

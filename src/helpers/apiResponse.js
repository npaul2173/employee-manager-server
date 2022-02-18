const notFoundResponse = (res, msg) => {
    const responseData = {
        status: false,
        message: msg,
    }
    return res.status(404).json(responseData)
}

const ConflictResponse = (res, message) => {
    const responseData = {
        status: false,
        message,
    }
    return res.status(409).json(responseData)
}

const ErrorResponse = (res, message) => {
    const responseData = {
        status: 0,
        message,
    }
    return res.status(500).json(responseData)
}

const successResponseWithData = function (res, msg, data) {
    var responseData = {
        status: true,
        message: msg,
        data: data,
    }
    return res.status(200).json(responseData)
}

const unauthorizedResponse = function (res, msg) {
    const responseData = {
        status: false,
        message: msg,
    }
    return res.status(401).json(responseData)
}

const validationErrorWithData = function (res, msg, data) {
    const responseData = {
        status: false,
        message: msg,
        errors: data,
    }
    return res.status(400).json(responseData)
}

module.exports = {
    notFoundResponse,
    unauthorizedResponse,
    validationErrorWithData,
    successResponseWithData,
    ConflictResponse,
    ErrorResponse,
}

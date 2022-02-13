const notFoundResponse = (res, msg) => {
    var data = {
        status: 0,
        message: msg,
    }
    return res.status(404).json(data)
}

module.exports = { notFoundResponse }

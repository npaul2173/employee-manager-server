const express = require('express')
const bodyParser = require('body-parser')
const api = require('./router')
const cors = require('cors')
const { notFoundResponse } = require('./controllers/apiResponse')
const mongoose = require('mongoose')
const { MONGODB_URL, SERVER_PORT } = require('./config')

mongoose.connect(
    MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error) {
        if (error) {
            console.log('Error!' + error)
        }
    }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', function () {
    console.log('-------------------------------------')
    console.log('| 🥬 MongoDB Connected successfully |')
    console.log('-------------------------------------')
})

// SERVER SETUP FOR PORT | ROUTES | CORS | BODY_PARSER | URL NOT FOUND
const app = express()
app.listen(SERVER_PORT, function () {
    console.log('----------------------------------------')
    console.log(`| ☕ Server is listening at port: ${SERVER_PORT} |`)
    console.log('----------------------------------------')
})
app.use(
    cors({
        origin: '*',
    })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api', api)
app.all('*', function (req, res) {
    return notFoundResponse(res, 'Page not found')
})

const express = require('express')
const path = require('path')
// const __dirname = path.dirname(__filename)
const bodyParser = require('body-parser')
const indexRouter = require('./src/routers')
const employeeRouter = require('./src/routers/router')
const api = require('./src/routers/api')
const cors = require('cors')
const {
    notFoundResponse,
    unauthorizedResponse,
} = require('./src/helpers/apiResponse')
const mongoose = require('mongoose')
const { MONGODB_URL, SERVER_PORT } = require('./src/config')

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
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', indexRouter)
app.use('/api', api)
app.use('/employee', employeeRouter)

// throw 404 if URL not found
app.all('*', function (req, res) {
    return notFoundResponse(res, 'Page not found')
})

app.use((err, req, res) => {
    if (err.name == 'UnauthorizedError') {
        return unauthorizedResponse(res, err.message)
    }
})

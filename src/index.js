const express = require('express')
const bodyParser = require('body-parser')
const api = require('./router')
const cors = require('cors')

const port = 3001
const app = express()

app.listen(port, function () {
    console.log('Server is listening at port:' + port)
})
app.use(
    cors({
        origin: '*',
    })
)
// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }))

// Parses the text as json
app.use(bodyParser.json())

app.use('/api', api)

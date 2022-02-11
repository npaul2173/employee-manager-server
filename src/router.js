var mongoose = require('mongoose')
var express = require('express')
var router = express.Router()
var EmployeeModel = require('./models/employeeSchema')

// mongoose.Promise = global.Promise;

mongoose.connect(
    'mongodb://localhost:27017/usersdb',
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
    console.log('Connected successfully')
})

router.post('/save', function (req, res) {
    var employeeModel = new EmployeeModel()
    employeeModel.firstName = req.body.firstName
    employeeModel.lastName = req.body.lastName
    employeeModel.RecordID = 1
    employeeModel.connectInfo = {
        tel: [req.body.tel],
        email: [req.body.email],
        address: {
            city: req.body.city,
            street: req.body.street,
            country: req.body.country,
            landmark: req.body.landmark,
            houseNumber: req.body.houseNumber,
        },
    }

    employeeModel.save(function (err, data) {
        if (err) {
            console.log(error)
        } else {
            res.send('Data inserted')
        }
    })
})

router.post('/delete', (req, res) => {
    const listingQuery = { _id: req.body.id }

    EmployeeModel.deleteOne(listingQuery, function (err, _result) {
        if (err) {
            res.status(400).send(
                `Error deleting listing with id ${listingQuery.listing_id}!`
            )
        } else {
            res.send(`1 document deleted`)
        }
    })
})

// get a singel employee with ID
router.get('/find/:employeeId', function (req, res) {
    let _id = req.params.employeeId
    // res.send(id)
    EmployeeModel.findById(_id, function (err, employee) {
        if (err) res.send(err)

        res.json(employee)
    })
})

router.get('/findall', function (req, res) {
    EmployeeModel.find(function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})

router.get('/', function (req, res) {
    res.send('sample get')
})

module.exports = router

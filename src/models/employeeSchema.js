var mongoose = require('mongoose')
const { getSequenceNextValue, insertCounter } = require('./sequence')

const AddressSchema = mongoose.Schema({
    city: String,
    street: String,
    country: String,
    landmark: String,
    houseNumber: String,
})

const ContactInfoSchema = mongoose.Schema({
    tel: [String],
    email: { type: [String], required: true },
    address: {
        type: AddressSchema,
        required: true,
    },
})

var EmployeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    connectInfo: ContactInfoSchema,
    EmployeeId: {
        type: Number,
        required: false,
    },
})

const EmployeeSchemaModel = mongoose.model(
    'employee',
    EmployeeSchema,
    'Employees'
)

EmployeeSchema.pre('save', (next) => {
    // let doc = this
    console.log('inside pre')
    next()
    // getSequenceNextValue('user_id')
    //     .then((counter) => {
    //         console.log('asdasd', counter)
    //         if (!counter) {
    //             insertCounter('user_id')
    //                 .then((counter) => {
    //                     doc.EmployeeId = counter
    //                     console.log(doc)
    //                     next()
    //                 })
    //                 .catch((error) => next(error))
    //         } else {
    //             doc.EmployeeId = counter
    //             next()
    //         }
    //     })
    //     .catch((error) => next(error))
})

module.exports = EmployeeSchemaModel

var mongoose = require('mongoose')

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
    RecordID: Number,
})

const EmployeeSchemaModel = mongoose.model(
    'employee',
    EmployeeSchema,
    'Employees'
)

module.exports = EmployeeSchemaModel

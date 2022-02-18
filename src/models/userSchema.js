var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        email: { type: String, required: false },
        password: { type: String, required: false },
    },
    { timestamps: true }
)

const UserSchemaModel = mongoose.model('user', UserSchema, 'Users')

module.exports = UserSchemaModel

const mongoose = require('mongoose')
const { Schema } = mongoose
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new Schema({
    username: {type: String, unique: true, required: [true, "cannot be empty"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    name: String,
    lastname: String,
    birth: Date,
    bio: String,
}, { timestamps: true })

UserSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        username: this.username,
        name: this.name,
        lastname: this.lastname,
        birth: this.birth,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

UserSchema.plugin(uniqueValidator, { message: 'is already taken.'})

module.exports = mongoose.model('User', UserSchema)
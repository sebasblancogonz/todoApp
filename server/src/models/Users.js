const mongoose = require('mongoose')
const { Schema } = mongoose

const UsersSchema = new Schema({
    username: String,
    name: String,
    lastname: String,
    birth: Date,
    bio: String,
}, { timestamps: true })

UsersSchema.methods.toJSON = function() {
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

mongoose.model('Users', UsersSchema)
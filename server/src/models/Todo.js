const mongoose = require('mongoose')
const { Schema } = mongoose

const TodoSchema = new Schema({
    title: String,
    description: String,
    user: Schema.Types.ObjectId,
    status: String
}, { timestamps: true })

TodoSchema.methods.toJSON = function () {
    return {
        _id: this.id,
        title: this.title,
        description: this.description,
        user: this.user,
        status: this.status,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

module.exports = mongoose.model('Todo', TodoSchema)
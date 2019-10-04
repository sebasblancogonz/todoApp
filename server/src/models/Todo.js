const mongoose = require('mongoose')
const { Schema } = mongoose

const TodoSchema = new Schema({
    title: String,
    description: String,
    user: Schema.Types.ObjectId,
    completed: Boolean
}, { timestamps: true })

TodoSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        title: this.title,
        description: this.description,
        user: this.user,
        completed: this.completed,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
}

module.exports = mongoose.model('Todo', TodoSchema)
const router = require('express').Router()
const Todo = require('../../models/Todo')
const constants = require('../../utils/constants')

router.post('/', async (req, res, next) => {
    const { title, description, user } =  req.body.todo

    const todo = new Todo({
        title,
        description,
        user,
        completed: false
    })
    
    await todo.save((err, todo) => {
        if (err) return res.json(err)
        return res.json({ status: constants.STATUS_OK, todoSaved: todo })
    })
})

router.get('/:userId', async (req, res) => {
    const { params } = req
    const todos = await Todo.find({ user: params.userId })
        .catch(err => {
            res.json(err)
        })
    if ( todos.length === 0) {
        res.json({
            message: "There's no tasks for this user."
        })
    } else {
        res.json({
            todos,
        })
    }
})

router.get('/', async (req, res) => {
    const todos = await Todo.find()
        .catch(err => {
            res.json(err)
        })
    if ( todos.length === 0) {
        res.json({
            message: "There's no tasks."
        })
    } else {
        res.json({
            todos,
        })
    }
})

router.delete('/:todoId', async(req, res) => {
    const { params } = req
    await Todo.findByIdAndDelete(params.todoId, (err, todo) => {
        if (err) return res.json(err)
        return res.json({ message: `ToDo ${todo.title} deleted successfully.`})
    })
})

module.exports = router
const router = require('express').Router()
const Todo = require('../../models/Todo')
const constants = require('../../utils/constants')

router.post('/', async (req, res, next) => {
  const { title, description, user } = req.body.todo

  const todo = new Todo({
    title,
    description,
    user,
    completed: false,
  })

  await todo.save((err, todo) => {
    if (err) return res.json(err)
    req.app.io.on('todoAdded', function(io){
        io.emit('todos', todos)
    })
    return res.json({ status: constants.STATUS_OK, todoSaved: todo })
  })
})

router.get('/u/:id', async (req, res) => {
  const { params } = req
  const todos = await Todo.find({ user: params.id }).catch(err => {
    res.json(err)
  })

  req.app.io.emit({todos})

  res.json({
    todos,
  })
})

router.get('/', async (req, res) => {
  const io = req.app.get('io')
  const todos = await Todo.find().catch(err => {
    res.json(err)
  })
  if (todos.length === 0) {
    res.json({
      message: "There's no tasks.",
    })
  } else {
    io.emit('todos', todos)
    res.json({
      todos,
    })
  }
})

router.delete('/:todoId', async (req, res) => {
  const { todoId } = req.params
  await Todo.findByIdAndDelete(todoId, (err, todo) => {
    if (err) return res.json(err)
    return res.json({ message: `ToDo ${todo} deleted successfully.` })
  })
})

router.put('/:todoId', async (req, res) => {
  const { todoId } = req.params

  await Todo.updateOne(
    { _id: todoId },
    { $set: { completed: true } },
    (err, todo) => {
      if (err) return res.json(err)
      return res.json({ message: `ToDo ${todo} modified successfully.` })
    }
  )
})

module.exports = router

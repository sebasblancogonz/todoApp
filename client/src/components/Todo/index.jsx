import React from 'react'
import PropTypes from 'prop-types'

const Todo = (todo) => (
  <li
    style={{ textDecoration: todo.completed ? 'line-through ' : 'none' }}
  >
      {todo.title}, 
      {todo.description}
  </li>
)

export default Todo
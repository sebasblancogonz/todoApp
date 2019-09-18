import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Todo } from '..'
import { getTodoList } from '../../redux/actions/todos'

const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo {...todo} />
      ))}
    </ul>
  )
}

const mapStateToProps = state => (
  {
  todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
  todoList: () => { dispatch(getTodoList()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

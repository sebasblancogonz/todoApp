import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { TodoElement, TodoProgress } from '..'
import constants from '../../../utils/constants'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient('http://localhost:3000/')
export class TodoList extends Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  pending(todos) {
    const completed = todos.filter(todo => {
      if (todo.completed) return todo
    }).length
    return { completed, total: todos.length }
  }

  componentDidMount() {
    const { onLoad } = this.props
    socket.on('todos', data => {
      console.log(data.todos),
      onLoad(data.todos)
    })
    axios(`http://localhost:3000/api/todos/u/${this.props.user}`)
      .then(res => {
        onLoad(res.data)
      })
      .catch(res => console.warn(`No data: ${res} `))
  }

  updateList() {
    const { onLoad } = this.props
    const socket = socketIOClient.connect('http://localhost:3000/')
    console.log(socket)
    socket.on('todos', todos => {
      onLoad(todos)
    })
    return axios(`http://localhost:3000/api/todos/u/${this.props.user}`)
      .then(res => onLoad(res.data))
      .catch(res => console.warn(`No data: ${res} `))
  }

  handleToggle(todo) {
    const { toggleTodo } = this.props
    if (todo.completed) return null
    axios
      .put(`http://localhost:3000/api/todos/${todo._id}`)
      .then(() => this.updateList(), toggleTodo(todo._id))
  }

  handleDelete(id) {
    const { onDelete } = this.props

    return axios
      .delete(`http://localhost:3000/api/todos/${id}`)
      .then(() => this.updateList(), onDelete(id))
  }

  render() {
    const todos = this.props.todos
    return todos.length ? (
      <Fragment>
        <TodoProgress todos={this.pending(todos)} />
        {todos &&
          todos.map(todo => {
            return (
              <TodoElement
                last={true}
                {...todo}
                onDelete={this.handleDelete}
                toggleTodo={this.handleToggle}
              />
            )
          })}
      </Fragment>
    ) : (
      <div className="noTodos">There's no todos!</div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: constants.HOME_PAGE_LOADED, data }),
  toggleTodo: todo => dispatch({ type: constants.TOGGLE_TODO, todo }),
  onDelete: id => dispatch({ type: constants.DELETE_TODO, id }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

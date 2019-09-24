import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { TodoElement } from '..'
import constants from '../../../utils/constants'

export class TodoList extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const { onLoad } = this.props
    axios('http://localhost:3000/api/todos')
      .then(res => onLoad(res.data))
      .catch(res => console.warn(`No data: ${res} `))
  }

  handleDelete(id) {
    const { onDelete } = this.props

    return axios
      .delete(`http://localhost:3000/api/todos/${id}`)
      .then(() => onDelete(id))
  }

  render() {
    const todos = this.props.todos
    let count = 0
    return todos.length ? (
      <div className="todos">
          {todos &&
            todos.map(todo => {
              if (count === todos.length - 1) {
                return (
                  <div className="wrapper-todo">
                    <TodoElement last={true} {...todo} />
                  </div>
                )
              } else {
                count++
                return (
                  <div className="wrapper-todo">
                    <TodoElement {...todo} />
                  </div>
                )
              }
            })}
      </div>
    ) : (
      <span>There's no todos!</span>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
})

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: constants.HOME_PAGE_LOADED, data }),
  onDelete: id => dispatch({ type: constants.DELTE_TODO, id }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

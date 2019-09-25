import React, { Fragment, Component } from 'react'

class TodoElement extends Component {
  constructor(props) {
    super(props)
  }

  checkMark(completed) {
    if (completed) {
      return (
        <Fragment>
          <div className="checkmark">
            <div className="stem"></div>
            <div className="kick"></div>
          </div>
        </Fragment>
      )
    }

    return null
  }
  render() {
    const todo = this.props
    return (
      <Fragment>
        <div className={'dot ' + (todo && todo.completed ? 'success' : '')}>
          {this.checkMark(todo.completed)}
        </div>

        <div className="todo">
          <div className="todoData">
            <div className="todoTitle">
              <span className="title">
                <h2>{todo.title}</h2>
              </span>
            </div>
            <div className="todoDesc">
              <p>{todo.description}</p>
            </div>
          </div>
        </div>
        <div className="icons">
          <i className="fa fa-check" aria-hidden="true" onClick={() => this.props.toggleTodo(todo)}></i>
          <div className="divider"></div>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </div>
      </Fragment>
    )
  }
}

export default TodoElement

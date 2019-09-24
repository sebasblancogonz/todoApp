import React, { Fragment, Component } from 'react'

export default class TodoElement extends Component {
  constructor(props) {
    super(props)
  }

  checkMark(completed) {
    console.log(completed)
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
      </Fragment>
    )
  }
}

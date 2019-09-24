import React, { Fragment, Component } from 'react'

export default class TodoElement extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const todo = this.props
    console.log(todo)
    return (
      <Fragment>
        <div className="dot"></div>
        <div className="todoTitle">
          <span className="title">
            <h2>{todo.title}</h2>
          </span>
        </div>
        <div className="todoDesc">
          <p>{todo.description}</p>
        </div>
      </Fragment>
    )
  }
}

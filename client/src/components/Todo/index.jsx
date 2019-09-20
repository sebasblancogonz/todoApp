import React, { Fragment, Component } from 'react'

export default class Todo extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const todo = this.props
    console.log(todo)
    return (
      <Fragment>
        <li>
          <div className={"node " + (todo.completed ? 'green' : 'grey')}></div>
          <p>
            {todo.title}{todo.description}
          </p>
        </li>
        {this.props.last ? '' : <div className={"divider " + (todo.completed ? 'green' : 'grey')}></div>}
        
      </Fragment>
    )
  }
}

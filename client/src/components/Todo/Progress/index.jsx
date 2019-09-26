import React, { Component } from 'react'
import { Progress } from 'react-sweet-progress'
import 'react-sweet-progress/lib/style.css'

export class TodoProgress extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { completed, total } = this.props.todos
    const percentage = (completed / total) * 100
    return (
      <div id="progress" hidden={percentage === 0 ? true : false}>
        <Progress percent={Math.round(percentage)} />
      </div>
    )
  }
}

export default TodoProgress

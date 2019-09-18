import React, { Component } from 'react'
import { AddTodo, TodoList } from '../..'
import CreateUser from '../../CreateUser'

export class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <AddTodo  />
          <CreateUser />
        </div>
        <div className="row">
            <TodoList />
        </div>
      </div>
    )
  }
}

export default Home

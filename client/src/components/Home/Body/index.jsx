import React from 'react'
import { AddTodo, TodoList } from '../..'
import CreateUser from '../../CreateUser'

const Home = () => (
      <div className="container">
        <div className="row">
          <AddTodo />
          <CreateUser />
        </div>
        <div className="row">
            <TodoList />
        </div>
      </div>
    )

export default Home

import React, { Fragment } from 'react'
import { AddTodo, TodoList } from '../..'
import Header from '../Header'

const Home = () => (
  <Fragment>
    <Header />
    <div className="container">
      <div className="row">
        <AddTodo />
      </div>
      <div className="row">
        <TodoList />
      </div>
    </div>
  </Fragment>
)

export default Home

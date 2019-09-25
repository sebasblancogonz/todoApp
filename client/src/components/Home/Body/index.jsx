import React, { Fragment } from 'react'
import { AddTodo, TodoList } from '../..'
import Header from '../Header'

const Home = () => (
  <Fragment>
    <Header />

    <div className="todos">
      <AddTodo />
      <TodoList />
    </div>
  </Fragment>
)

export default Home

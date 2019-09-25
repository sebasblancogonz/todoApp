import React, { Fragment } from 'react'
import { AddTodo, TodoList } from '../..'
import Header from '../Header'

const Home = () => (
  <Fragment>
    <Header />
    <AddTodo />
    <TodoList />
  </Fragment>
)

export default Home

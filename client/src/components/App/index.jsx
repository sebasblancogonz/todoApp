import React, { Component } from 'react'
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom'

import { Home, Register, Login } from '..'

import '../../styles/styles.css'
import { PrivateRoute } from '../PrivateRoute'

const App = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </BrowserRouter>
)

export default withRouter(App)

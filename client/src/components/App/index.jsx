import React, { Component } from 'react'
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { Home, Register, Login } from '..'

import '../../styles/styles.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    )
  }
}


export default withRouter(App)

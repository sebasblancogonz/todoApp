import React from 'react'
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom'

import { Home } from '..'
import CreateUser from '../CreateUser'

import '../../styles/styles.css'

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/register" component={CreateUser}/>
        </Switch>
    </BrowserRouter>
)

export default withRouter(App)


import React from 'react'
import { BrowserRouter, withRouter, Switch, Route } from 'react-router-dom'

import { Home, Register } from '..'

import '../../styles/styles.css'

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </BrowserRouter>
)

export default withRouter(App)


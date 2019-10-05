  
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { PrivateRoute } from './helpers/PrivateRoute'
import { history } from './helpers/history'

import Home from './pages/Home/'
import Login from './pages/Login/'

// import PageNotFound from './pages/PageNotFound/'
// import List from './pages/List/'

function Routes() {
	return (
        <Router history={history}>
            <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />
                {/*<Route path="*" component={PageNotFound} />*/}
            </Switch>
        </Router>
	)
}

export default Routes
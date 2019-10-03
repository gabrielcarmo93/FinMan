  
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { PrivateRoute } from './helpers/PrivateRoute'

import Home from './pages/Home/'
import Login from './pages/Login/'
// import PageNotFound from './pages/PageNotFound/'
// import List from './pages/List/'

function Routes() {
	return (
        <BrowserRouter>
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            {/*<Route path="*" component={PageNotFound} />*/}
        </BrowserRouter>
	)
}

export default Routes
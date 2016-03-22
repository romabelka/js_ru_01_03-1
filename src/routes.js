import React from 'react'
import { Router, Route, browserHistory, hashHistory } from 'react-router'
import App from './containers/App'
import Articles from './containers/Articles'

export default (
    <Router history = {browserHistory}>
        <Route path="/" component = {App}>
            <Route path ="/articles" component = {Articles}/>
        </Route>
    </Router>
)
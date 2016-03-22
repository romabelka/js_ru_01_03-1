import React from 'react'
import { Router, Route, browserHistory, hashHistory } from 'react-router'
import App from './containers/App'
import Articles from './containers/Articles'
import ArticlePage from './containers/ArticlePage'

export default (
    <Router history = {browserHistory}>
        <Route path="/" component = {App}>
            <Route path ="/articles" component = {Articles}>
                <Route path = ":id" components = {ArticlePage} />
            </Route>
        </Route>
    </Router>
)
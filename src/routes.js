import React from 'react'
import { Router, Route, browserHistory, Redirect, IndexRedirect } from 'react-router'
import App from './containers/App'
import Articles from './containers/Articles'
import ArticlePage from './containers/ArticlePage'
import NewArticle from './containers/NewArticle'
import CommentsIndex from './containers/CommentIndex'
import CommentsPaginationPage from './containers/CommentsPaginationPage'
import NotFound from './containers/NotFound'

export default (
    <Router history = {browserHistory}>
        <Route path="/" component = {App}>
            <Redirect from="article" to="articles" />
            <Route path ="articles" component = {Articles}>
                <Route path = "new" component = {NewArticle} />
                <Route path = ":id" component = {ArticlePage} />
            </Route>
            <Route path="comments" component = {CommentsIndex}>
                <IndexRedirect to="1"/>
                <Route path = ":page" component = {CommentsPaginationPage} />
            </Route>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
)
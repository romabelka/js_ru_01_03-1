import React from 'react'
import { Router, Route, Redirect, IndexRedirect } from 'react-router'
import App from './containers/App'
import Articles from './containers/Articles'
import ArticlePage from './containers/ArticlePage'
import NewArticle from './containers/NewArticle'
import CommentsIndex from './containers/CommentIndex'
import CommentsPaginationPage from './containers/CommentsPaginationPage'
import NotFound from './containers/NotFound'
import history from './history'
import { userStore } from './stores'

export default (
    <Router history = {history}>
        <Route path="/" component = {App}>
            <Redirect from="article" to="articles" />
            <Route path ="articles" components = {Articles}>
                <Route path = "new" component = {NewArticle}
                    onEnter = {(nextState, transition) => auth(nextState, transition)}
                    onLeave = {() => console.log('---', 'leaving route new')}
                />
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

function auth(nextState, transition) {
    let currentUser = userStore.getCurrentUser();
    if ( !currentUser ) {
        transition('/articles');
        return false;
    }
}
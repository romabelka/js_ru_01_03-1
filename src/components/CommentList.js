import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import toggleOpen from '../HOC/toggleOpen'
import linkedState from 'react-addons-linked-state-mixin'
import { addComment, loadCommentsForArticle } from '../actions/comments'

const CommentList = React.createClass({
    mixins: [linkedState],
    propTypes: {
        article: PropTypes.object
    },
    getInitialState() {
        return {
            comment: ''
        }
    },
    componentWillReceiveProps(nextProps) {
        const { article, isOpen } = nextProps
        if (article.loadedComments || article.loadingComments) return

        if (isOpen && !this.props.isOpen) loadCommentsForArticle({id: article.id})
    },
    render() {
        const { isOpen, toggleOpen, article } = this.props
        const actionText = isOpen ? 'hide comments' : 'show comments'
        return (
            <div>
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                {this.getList()}
                {this.getInput()}
            </div>
        )
    },
    getInput() {
        if (!this.props.isOpen) return null
        return <div>
            <input valueLink={this.linkState("comment")}/>
            <a href = "#" onClick = {this.addComment}>add comment</a>
        </div>
    },

    getList() {
        const {isOpen, article} = this.props
        if (!isOpen) return null
        if (article.loadingComments) return <h3>Loading comments</h3>
        if (!article.loadedComments) return null
        const commentItems = article.getRelation('comments').map((comment) => <li key={comment.id}><Comment comment = {comment}/></li>)
        return <ul>{commentItems}</ul>
    },

    addComment(ev) {
        ev.preventDefault()
        addComment(this.props.article.id, this.state.comment)
        this.setState({
            comment: ''
        })
    }
})

export default toggleOpen(CommentList)
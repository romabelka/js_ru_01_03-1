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
    contextTypes: {
        vocabulary: PropTypes.object,
        lang: PropTypes.string,
        user: PropTypes.string
    },
    componentWillReceiveProps(nextProps) {
        const { article, isOpen } = nextProps
        if (article.loadedComments || article.loadingComments) return

        if (isOpen && !this.props.isOpen) loadCommentsForArticle({id: article.id})
    },
    render() {
        const { isOpen, toggleOpen, article,children } = this.props
        const {vocabulary, lang} = this.context

        const actionText = isOpen ? vocabulary.hideComments[lang] : vocabulary.showComments[lang]
        return (
            <div>
                {children}
                <a href = "#" onClick = {toggleOpen}>{actionText}</a>
                {this.getList()}
                {this.getInput()}
            </div>
        )
    },
    getInput() {
        const {vocabulary, lang} = this.context
        if (!this.props.isOpen) return null
        return <div>
            <input valueLink={this.linkState("comment")}/>
            <a href = "#" onClick = {this.addComment}>{vocabulary.addComment[lang]}</a>
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
        let user = this.context.user || 'unknown';
        let comment = `${this.state.comment} by ${user}`;
        addComment(comment, this.props.article.id)
        this.setState({
            comment: ''
        })
    }
})

export default toggleOpen(CommentList)
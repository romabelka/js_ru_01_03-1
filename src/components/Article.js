import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import CommentList from './CommentList'
import { deleteArticle, loadArticleById } from '../actions/articles'

class Article extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        article: PropTypes.object.isRequired
    }

    render() {
        return (
            <div ref="container">
                <a href = "#" onClick = {this.handleDelete}>delete</a>
                {this.getTitle()}
                {this.getBody()}
            </div>
        )
    }

    handleDelete = (ev) => {
        ev.preventDefault()
        deleteArticle(this.props.article.id)
    }

    getBody() {
        const { article, isOpen } = this.props
        if (article.loading) return <h3>Loading article</h3>
        return (
            <div>
                <p>{article.text}</p>
                {this.getCommentList()}
            </div>
        )
    }

    getCommentList() {
        return  <CommentList ref= "comments"
                             article = {this.props.article}
        >
            <h3>Comments for article {this.props.article.id}</h3>
        </CommentList>
    }

    addComment = (comment) => {
        addComment(comment, this.props.article.id)
    }

    getTitle() {
        const { article: { title }, openArticle  } = this.props
        return  (
            <h3 onClick={openArticle}>
                {title}
            </h3>
        )
    }
}

export default Article
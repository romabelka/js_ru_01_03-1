import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Article from './Article'
import CommentList from './CommentList'
import oneOpen from '../HOC/oneOpen'

class ArticleList extends Component {
    render() {
        const { articles, isItemOpen, openItem } = this.props
        const articleItems = articles.map((article) =>
            <li key={article.id}>
                <Link to={`/articles/${article.id}`}>{article.title}</Link>
            </li>
        )
        return (
            <div>
                <ul>
                    {articleItems}
                </ul>
            </div>
        )
    }

}


export default oneOpen(ArticleList)
import { ADD_COMMENT, LOAD_COMMENTS_FOR_ARTICLE } from './constants'
import AppDispatcher from '../dispatcher'
import { loadForArticle } from './api/comments'
import { asyncAC } from './api/utils'

export function addComment(comment, articleId) {
    AppDispatcher.dispatch({
        type: ADD_COMMENT,
        data: {comment, articleId}
    })
}

export const loadCommentsForArticle = asyncAC(loadForArticle, LOAD_COMMENTS_FOR_ARTICLE)
import $ from 'jquery'

export function loadForArticle({ id }) {
    return $.get(`/api/comment?article=${id}`)
}
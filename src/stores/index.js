import Article from './Article'
import Comment from './Comment'
import User from './User'
import SimpleStore from './SimpleStore'

const stores = {}

Object.assign(stores, {
    articles: new Article(stores),
    comments: new Comment(stores),
    user: new User(stores)
})

window.stores = stores
export const articleStore = stores.articles
export const commentStore = stores.comments
export const userStore = stores.user

export default stores


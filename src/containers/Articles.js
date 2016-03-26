import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import ArticleList from '../components/ArticleList'
import { articleStore, userStore } from '../stores'
import { signIn } from '../actions/user'

class Articles extends Component {
    constructor() {
        super()
        this.state = {
            articles: articleStore.getOrLoadAll(),
            loading: articleStore.loading,
            name: ''
        }
    }

    static contextTypes = {
        router: PropTypes.object,
        vocabulary: PropTypes.object,
        lang: PropTypes.string
    }

    static childContextTypes = {
        user: PropTypes.string
    }

    getChildContext() {
        return {
            user: this.state.user//this.state.user
        }
    }

    componentDidMount() {
        articleStore.addChangeListener(this.articlesChanged)
        userStore.addChangeListener(this.userChanged)
    }

    componentWillUnmount() {
        articleStore.removeChangeListener(this.articlesChanged)
        userStore.removeChangeListener(this.userChanged)
    }

    articlesChanged =() => {
        this.setState({
            articles: articleStore.getOrLoadAll(),
            loading: articleStore.loading
        })
    }

    render() {
        const { articles, loading } = this.state
        const {vocabulary, lang} = this.context
        if (loading) return <h1>Loading...</h1>
        return (
            <div>
                <h3><Link to="/articles/new">{vocabulary.newArticle[lang]}</Link></h3>
                <input value={this.state.name} onChange = {this.changeName}/>
                <a href="#" onClick = {this.signIn} >{vocabulary.signIn[lang]}</a>
                <ArticleList articles = {articles}/>
                {this.props.children}
            </div>
        )
    }

    changeName = (ev) => {
        this.setState({
            name: ev.target.value
        })
    }

    userChanged = () => {
        this.setState({
            user: userStore.currentUser
        })
    }

    signIn = (ev) => {
        ev.preventDefault()
        signIn(this.state.name)
    }
}

export default Articles
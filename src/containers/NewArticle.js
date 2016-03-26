import React, { Component, PropTypes } from 'react'

class NewArticle extends Component {
    static propTypes = {

    };

    static contextTypes = {
        vocabulary: PropTypes.object,
        lang: PropTypes.string
    }

    render() {
        const {vocabulary, lang} = this.context

        return (
            <div>
                <h2>{vocabulary.newArticle[lang]}</h2>
            </div>
        )
    }
}

export default NewArticle
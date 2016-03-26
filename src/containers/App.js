import React, { Component, PropTypes } from 'react'
import voc from '../data/inter';

class App extends Component {
    constructor() {
        super();

        this.state = {
            lang: 'en'
        }
    }

    static propTypes = {

    };

    //static contextTypes = {
    //    vocabulary: PropTypes.object,
    //    lang: PropTypes.string
    //}

    static childContextTypes = {
        vocabulary: PropTypes.object,
        lang: PropTypes.string
    }

    getChildContext() {
        return {
            vocabulary: voc,
            lang: this.state.lang
        }
    }

    render() {
        return (
            <div>
                <h1>
                    {voc.appTitle[this.state.lang]}
                    &emsp;
                    <a href="#" onClick={this.switchVocabulary}>en</a>
                    &nbsp;
                    <a href="#" onClick={this.switchVocabulary}>ru</a>
                </h1>
                {this.props.children}
            </div>
        )
    }

    switchVocabulary = (e) => {
        e.preventDefault();

        let lang = e.target.innerHTML.trim();

        if ( lang === 'en' ) {
            this.setState({lang: 'en'});
        }

        if ( lang === 'ru' ) {
            this.setState({lang: 'ru'});
        }
    }
}

export default App
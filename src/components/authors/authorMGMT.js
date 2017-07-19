'use strict';

import React from 'react';
import AuthorForm from './authorForm';
import AuthorAPI from '../../api/authorAPI';
import {Router} from 'react-router';

export default class AuthorMGMT extends React.Component {
    //Could not add mixins, so fall fack to routing in context 
    static contextTypes = {
        router: React.PropTypes.func.isRequired
    }
    
    state = {
        author: { id: '', firstName: '', lastName: '' },
        errors: {},
        dirty: false
    }
    
    setAuthorState = (event) => {
        this.setState({dirty: true});
        let field = event.target.name;
        let value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    }
    
    saveAuthor = (event) => {
        event.preventDefault();
        console.log(this);
        AuthorAPI.saveAuthor(this.state.author);
        this.context.router.transitionTo('authors');
    }
    render() {
        return (
            <div>
                <h1>Author MGMT</h1>
                <AuthorForm 
                    author={this.state.author}
                    onChange={this.setAuthorState}
                    onSave={this.saveAuthor}
                />
            </div>
            );
    }
}
'use strict';

import React from 'react';
import AuthorForm from './authorForm';
import AuthorAPI from '../../api/authorAPI';
import {Router} from 'react-router';
import toastr from 'toastr';

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
    
    authorFormIsValid = () => {
        let validForm = true;
        this.state.errors = {};
        
        if(this.state.author.firstName.length < 3){
            this.state.errors.firstName = 'First name should be at least 3 chars';
            validForm = false;
        }
        
        if(this.state.author.lastName.length < 3){
            this.state.errors.lastName = 'Last name should be at least 3 chars';
            validForm = false;
        }
        
        this.setState({errors: this.state.errors});
        
        return validForm;
    }
    
    saveAuthor = (event) => {
        event.preventDefault();
        if(!this.authorFormIsValid()){
            return;
        }
        console.log(this);
        AuthorAPI.saveAuthor(this.state.author);
        toastr.success('Author saved.');
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
                    errors={this.state.errors}
                />
            </div>
            );
    }
}
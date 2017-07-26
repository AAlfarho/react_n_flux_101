'use strict';

import _ from 'lodash';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../actions/actionTypes';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _authors = [];

let AuthorStore = Object.assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    
    emitChange: function() {
      this.emit(CHANGE_EVENT);  
    },
    
    getAllAuthors: function(){
        return _authors;
    },
    
    getAuthorById: function(id){
        return _.find(_authors, {id: id});
    }
});

Dispatcher.register((action) => {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.UPDATE_AUTHOR:
            let existingAuthor = _.find(_authors, {id: action.author.id});
            let existingAuthorIndex = _.indexOf(_authors, existingAuthor);
            _authors.splice(existingAuthorIndex, 1, action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.DELETE_AUTHOR:
             _.remove(_authors, (author) => action.id === author.id);
            AuthorStore.emitChange();
            break;
        default:
            // code
    }
});

export default AuthorStore;
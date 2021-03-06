'use strict';

import React from 'react';
import Header from './commons/header';
import {RouteHandler} from 'react-router';

export default class App extends React.Component{
    render() {
        return (
            <div>
                <Header />
                <div className='container-fluid'>
                    <RouteHandler />
                </div>
            </div>
            );
    }
}
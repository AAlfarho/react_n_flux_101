import $ from 'jquery';
import jQuery from 'jquery';

import React from 'react';
import Router from 'react-router';
import routes from './routes';


Router.run(routes, (Handler) => {
   React.render( <Handler />, document.getElementById('app')); 
});
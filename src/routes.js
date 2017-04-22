// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Stream from './Stream';


const Routes = (props) => (
  <Router {...props}>
	<Switch>
		<Route path="/channel/:id" component={Stream} />
		<Route path="/" component={App} />
	</Switch>	
  </Router>
);

export default Routes;
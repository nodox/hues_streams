import React, { Component } from 'react';
import Header from './partials/Header';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Stream from './pages/Stream';
import Dashboard from './pages/Dashboard'; 
import ProtectedRoute from './routes/ProtectedRoute';

import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/register" component={Auth} />
          <Route exact path="/channel/:id" component={Stream} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} redirectTo='/register' />  
        </Switch> 
      </div>
    );
  }
}

export default App;

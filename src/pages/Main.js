import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import Auth from './Auth';
import Stream from './Stream';


class Main extends Component {

  render() {
    return (
      <div className="">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/register" component={Auth} />
          <Route exact path="/channel/:id" component={Stream} />
        </Switch> 
      </div>
    );
  }
}

export default Main;

import React, { Component } from 'react';
import Main from './pages/Main';
import Header from './partials/Header';

import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <div className="fb-video" data-href="https://www.facebook.com/facebook/videos/10153231379946729/" data-width="500" data-show-text="false">
          <div className="fb-xfbml-parse-ignore">
            <blockquote cite="https://www.facebook.com/facebook/videos/10153231379946729/">
              <a href="https://www.facebook.com/facebook/videos/10153231379946729/">How to Share With Just Friends</a>
              <p>How to share with just friends.</p>
              Posted by <a href="https://www.facebook.com/facebook/">Facebook</a> on Friday, December 5, 2014
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';


import App from './App';
import './index.css';


const Core = (props) => (
  <Router history={browserHistory} {...props}>
    <App />
  </Router>
);


ReactDOM.render(<Core />, document.getElementById('root'));
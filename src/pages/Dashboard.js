import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { logout } from '../utils/AuthService';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this._logout = this._logout.bind(this);
  }

  _logout() {
    logout();
    this.props.history.push('/');
  }

  render() {

    return (
      <div>
        Hello dashboard

        <button className="btn btn-danger" onClick={this._logout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;

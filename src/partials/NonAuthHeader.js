import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class NonAuthHeader extends Component {

  render() {

    return (
      <div>
        <nav className="navbar navbar-toggleable-sm navbar-inverse bg-inverse">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">Project Stream</a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/' className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/register' className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to='/register' className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                <Link to='/contact' className="nav-link">Contact</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NonAuthHeader;

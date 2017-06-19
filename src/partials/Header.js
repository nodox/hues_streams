import React, { Component } from 'react';
import * as AuthService from '../utils/AuthService';
import AuthHeader from './AuthHeader';
import NonAuthHeader from './NonAuthHeader';


class Header extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    if (AuthService.isLoggedIn()) {
      return <AuthHeader />
    } else {
      return <NonAuthHeader />
    }
  }
}

export default Header;

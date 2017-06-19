// Useful when customizing video player
// https://github.com/videojs/video.js/blob/master/docs/guides/react.md
// http://docs.videojs.com/tutorial-react.html

import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as AuthService from '../utils/AuthService';
// import shuffle from 'shuffle-array';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameForLogin: '',
      passwordForLogin: '',

      usernameForRegister: '',
      passwordForRegister: '',
      passwordConfirmationForRegister: '',

      authenticated: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });  
  }

  handleRegisterSubmit(event) {
    event.preventDefault();

    var formData = {
      username: this.state.usernameForRegister,
      password: this.state.passwordForRegister,
      passwordConfirmation: this.state.passwordConfirmationForRegister
    };

    axios.post('/api/register', formData)
      .then(res => {
        // console.log(res.data);
        AuthService.setAccessToken(res.data.token);

        // this.setState({ authenticated: res.data.success });
        this.props.history.push('/'); // works for redirect

      })
      .catch( err => {
        console.log(err);
      });
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    var formData = {
      username: this.state.usernameForLogin,
      password: this.state.passwordForLogin
    };

    axios.post('/api/login', formData)
      .then(res => {
        console.log(res.data);
        AuthService.setAccessToken(res.data.token);
        this.props.history.push('/'); 
      })
      .catch( err => {
        console.log(err);
      });
  }


  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <form onSubmit={this.handleRegisterSubmit}>
              <h6>Create a new account</h6>
              <div className="form-group">
                <input onChange={this.handleInputChange} name="usernameForRegister" type="text" className="form-control" id="usernameInput" placeholder="username"/>
              </div>
              <div className="form-group">
                <input onChange={this.handleInputChange} name="passwordForRegister" type="password" className="form-control" id="passwordRegisterInput" placeholder="password"/>
              </div>
              <div className="form-group">
                <input onChange={this.handleInputChange} name="passwordConfirmationForRegister" type="password" className="form-control" id="passwordConfirmationInput" placeholder="password confirmation"/>
              </div>
              <input type="submit" className="btn btn-primary" value="Submit" />
            </form>

          </div>
          <div className="col-sm-6">
            <form onSubmit={this.handleLoginSubmit}>
              <h6>Login</h6>
              <div className="form-group">
                <input onChange={this.handleInputChange} name="usernameForLogin" type="text" className="form-control" id="usernameLoginInput" placeholder="username"/>
              </div>
              <div className="form-group">
                <input onChange={this.handleInputChange} name="passwordForLogin" type="password" className="form-control" id="passwordLoginInput" placeholder="password"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );

  }

}

export default Auth;
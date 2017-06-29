import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/AuthService';

// Good Explanation of Syntax
// https://github.com/ReactTraining/react-router/issues/4105

const ProtectedRoute = ({ component: Component, redirectTo, ...rest }) => (
  <Route {...rest} render={props => (
    isLoggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: redirectTo,
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default ProtectedRoute
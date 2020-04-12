import Auth from '../../utils/Auth'
import FacebookSignInButton from './FacebookSignInButton.react'
import GoogleSignInButton from './GoogleSignInButton.react'
import React from 'react';
import {useHistory, useLocation} from "react-router-dom";

import './SignIn.css';

const {useCallback, useEffect, useState} = React;

function SignIn(props) {
  const history = useHistory();
  const location = useLocation();
  const [authFailure, setAuthFailure] = useState('');
  const [isAuthLoaded, setAuthLoaded] = useState(Auth.isLoaded());
  const [isSignedIn, setSignedIn] = useState(Auth.isAuthenticated());
  const {from, isLogout} = location.state || {from: null, isLogout: false};

  const clickHandler = useCallback(() => {
    if (isSignedIn === true) {
      Auth.logout()
        .then((onSuccess) => setSignedIn(false))
        .catch(({error}) => setAuthFailure(error));
    } else {
      Auth.login()
        .then((onSuccess) => {
          setSignedIn(true);
          setAuthFailure('');
          history.push({pathname: "/"});
        })
        .catch(({error}) => setAuthFailure(error));
    }
  }, [from, history, isSignedIn]);

  useEffect(() => {
    const failureCallback = ({error}) => {
      setAuthLoaded(true);
      setAuthFailure(error);
    };
    const successCallback = (auth2) => {
      setAuthLoaded(true);
      setSignedIn(auth2.isSignedIn.get());
      auth2.isSignedIn.get() === true && from != null && history.replace(from);
    };
    if (Auth.isGoogleAuthenticated !== true) {
      Auth.registerFailure('SignInFailure', failureCallback);
      Auth.registerSuccess('SignInSuccess', successCallback);
    }
    setSignedIn(Auth.isAuthenticated() && !isLogout);
    return () => {
      Auth.removeFailure('SignInFailure', failureCallback);
      Auth.removeSuccess('SignInSuccess', successCallback);
    };
  });

  return isAuthLoaded !== true
    ? <div className="signIn">Loading...</div>
    : (
        <div className="signIn">
          <div className="signInTitle">Hello, Welcome to Shelter Music</div>
          {from?.pathname !== '/' && from?.pathname != null &&
            <div>You must log in to view the page at {from.pathname}</div>
          }
          {from?.pathname !== '/' && authFailure !== '' &&
            <div className="signInError">{`Error: {authFailure}`}</div>}
          <div className="subContainer">
            <div>Login</div>
            <FacebookSignInButton />
            <GoogleSignInButton
              isSignedIn={isSignedIn && isLogout === false}
              onClick={clickHandler} />
          </div>
          <div className="subContainer">
            <div>or</div>
            <div className="signUpButton">Sign up</div>
          </div>
          <div />
        </div>
      );
}

export default SignIn;

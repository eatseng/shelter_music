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
  const {from, isLogout} = location.state || {from: null, isLogout: false};
  const [authFailure, setAuthFailure] = useState('');
  const [authCnt, setAuthCnt] = useState(
    {success: Auth.isLoaded() ? 1 : 0, error: 0},
  );
  const [isSignedIn, setSignedIn] = useState(
    Auth.isAuthenticated() && isLogout === false,
  );

  const clickHandler = useCallback(() => {
    if (isSignedIn) {
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
        .catch(({error}) => setAuthFailure(`${error} Google auth failed!`));
    }
  }, [history, isSignedIn]);

  useEffect(() => {
    const failureCallback = ({error}) => {
      setAuthCnt({...authCnt, error: authCnt.error + 1});
      setAuthFailure(error);
    };
    const successCallback = (auth2) => {
      setTimeout(() => {
        setAuthCnt({...authCnt, success: authCnt.success + 1});
        setSignedIn(auth2.isSignedIn.get());
        auth2.isSignedIn.get() === true &&
          from != null &&
          history.replace(from);
        }, 0,
      );
    };

    Auth.registerFailure('SignInFailure', failureCallback);
    Auth.registerSuccess('SignInSuccess', successCallback);

    return () => {
      Auth.removeFailure('SignInFailure', failureCallback);
      Auth.removeSuccess('SignInSuccess', successCallback);
    };
  }, [authCnt, from, history]);

  return authCnt.error + authCnt.success === 0
    ? <div className="signIn">Loading...</div>
    : (
        <div className="signIn">
          <div className="signInTitle">Hello, Welcome to Shelter Music</div>
          {from?.pathname !== '/' && from?.pathname != null &&
            <div>You must log in to view the page at {from.pathname}</div>
          }
          {authCnt.error > 1 && authFailure !== '' &&
            <div className="signInError">{`Error: {authFailure}`}</div>
          }
          <div className="subContainer">
            <div>Login</div>
            <FacebookSignInButton />
            <GoogleSignInButton
              isSignedIn={isSignedIn}
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

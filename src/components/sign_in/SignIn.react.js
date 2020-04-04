import FacebookSignInButton from './FacebookSignInButton.react'
import GoogleSignInButton from './GoogleSignInButton.react'
import React from 'react';

import './SignIn.css';

function SignIn(props) {
  return (
    <div className="signIn">
      <div className="signInTitle">Hello, Welcome to Shelter Music</div>
      <div className="subContainer">
        <div>Login</div>
        <FacebookSignInButton />
        <GoogleSignInButton />
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

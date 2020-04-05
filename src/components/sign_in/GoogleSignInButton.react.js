import React from 'react';

import './GoogleSignInButton.css';

function GoogleSignInButton(props) {
  return (
    <div className="googleSignInButton" onClick={props.onClick}>
      {props.isSignedIn !== true ? 'Google' : 'Log out'}
    </div>
  );
}

export default GoogleSignInButton;

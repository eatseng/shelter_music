import React from 'react';

import './GoogleSignInButton.css';

const {useEffect, useRef, useState} = React;

function GoogleSignInButton(props) {
  const [isReady, setReady] = useState(false);
  const buttonRef = useRef(null);

  const clickHandler = (googleUser) => {
    if (googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log('Token || ' + googleUser.getAuthResponse().id_token);
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    }
  }

  useEffect(() => {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        const auth2 = window['gapi'].auth2.init({
          client_id: '990982699847-5gbnem13btv2gd15vnbuomovr6miupua.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        auth2.attachClickHandler(
          buttonRef.current,
          {},
          clickHandler,
          (error) => {
            alert(JSON.stringify(error, undefined, 2));
          },
        );
      });
    }
    
    if (buttonRef.current != null) {

      (function(d, element, id){
        const [fjs] = d.getElementsByTagName(element);
        if (d.getElementById(id)) {return;}
        
        const script = d.createElement(element);
        script.id = id;
        script.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
        fjs.parentNode.insertBefore(script, fjs);
      }(document, 'script', 'google-jssdk'));
    }
   
  }, [buttonRef.current]);

  return (
    <div className="googleSignInButton" ref={buttonRef}>
      Google
    </div>
  );
}

export default GoogleSignInButton;

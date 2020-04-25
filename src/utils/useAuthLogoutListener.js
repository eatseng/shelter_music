import Auth from './Auth';
import React from 'react';

import {useHistory} from "react-router-dom";

const {useEffect} = React;

const useAuthLogoutListener = () => {
  const history = useHistory();

  useEffect(() => {
    
    const failureCallback = ({error}) => {
      history.push({pathname: "/login", state: {isLogout: false}});
    };

    Auth.addEventListener('failure', failureCallback);

    return () => Auth.removeEventListener('failure', failureCallback);

  }, [history]);

}

export default useAuthLogoutListener;
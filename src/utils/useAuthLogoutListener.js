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

    Auth.registerFailure('useAuthLogoutFailure', failureCallback);

    return () => {
      Auth.removeFailure('useAuthLogoutFailure', failureCallback);
    };
  }, [history]);

}

export default useAuthLogoutListener;
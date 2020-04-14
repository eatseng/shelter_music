import Auth from '../utils/Auth'
import Avatar from './user/Avatar.react'
import React from 'react';

import {useHistory} from "react-router-dom";
import useAuthLogoutListener from '../utils/useAuthLogoutListener'

import './Navbar.css';

function Navbar(props) {
  const history = useHistory();  

  const logoutHandler = () => {
    Auth.logout();
    history.push({pathname: "/login", state: {isLogout: true}});
  };

  useAuthLogoutListener();
  return (
    <div className="navbar">
      <div style={{cursor: 'pointer'}}>Home</div>
      <div className="navbarTitle">
        {props.title}
      </div>
      <div className="navbarAvatar">
        <Avatar title={props.user.givenName} url={props.user.picture} />
        <div className="navbarAvatarDropDown">
          <div
            className="navbarButton navbarDropDownButton"
            onClick={logoutHandler}>
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

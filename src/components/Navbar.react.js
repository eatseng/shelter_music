import Auth from '../utils/Auth'
import Avatar from './user/Avatar.react'
import React from 'react';

import {useHistory} from "react-router-dom";
import useAuthLogoutListener from '../utils/useAuthLogoutListener'

import './Navbar.css';

function Navbar(props) {
  const history = useHistory();  

  const homeHandler = () => {
    history.push({pathname: "/"});
  }

  const logoutHandler = () => {
    Auth.logout();
    history.push({pathname: "/login", state: {isLogout: true}});
  };

  useAuthLogoutListener();
  return (
    <div className="navbar">
      <div className="navbarHome" onClick={homeHandler}>Home</div>
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

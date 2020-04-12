import AddRoomModal from './room/AddRoomModal.react'
import Auth from '../utils/Auth'
import Avatar from './user/Avatar.react'
import React from 'react';
import SignIn from './sign_in/SignIn.react'

import graphql from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useHistory} from "react-router-dom";

import './Home.css';

const {useCallback, useState} = React;

const query = graphql`
  query HomeQuery { 
    user {
      givenName
      picture
    }
  }
`;

function Home(props) {
  const history = useHistory();  
  const {user} = useLazyLoadQuery(query, {});
  const [modalOn, setModalOn] = useState(null);

  const addRoomHandler = useCallback(
    (turnOn)=> () => {setModalOn(turnOn === true ? 'addRoom' : null)},
  );
  const logoutHandler = useCallback(() => {
    Auth.logout();
    history.push({pathname: "/login", state: {isLogout: true}});
  });
  return (
    <div className="home">
      <div className="homeTop">
        <div style={{cursor: 'pointer'}}>Home</div>
        <div className="homeTitle">
          {`Hello ${user.givenName}, what would you like to do?`}
        </div>
        <div className="homeAvatar">
          <Avatar title={user.givenName} url={user.picture} />
          <div className="homeAvatarDropDown">
            <div
              className="homeButton homeDropDownButton"
              onClick={logoutHandler}>
              Logout
            </div>
          </div>
        </div>
      </div>
      <div
        className="homeButton homeCreateButton"
        onClick={addRoomHandler(true)}>
        {`+ New Music Room`}
      </div>
      <div>
        <div>My Rooms</div>
      </div>
      <AddRoomModal
        modalOn={modalOn === 'addRoom'}
        turnOff={addRoomHandler(false)}
      />
    </div>
  );
}

export default Home;

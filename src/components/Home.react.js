import AddRoomModal from './room/AddRoomModal.react'
import Auth from '../utils/Auth'
import Avatar from './user/Avatar.react'
import Navbar from './Navbar.react'
import React from 'react';

import graphql from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useHistory} from "react-router-dom";
import useAuthLogoutListener from '../utils/useAuthLogoutListener'

import './Home.css';

const {useCallback, useState} = React;

const query = graphql`
  query HomeQuery { 
    rooms {
      creator {
        ... on User {
          givenName
          picture
        }
      }
      id
      name
    }
    user {
      givenName
      picture
    }
  }
`;

function Home(props) {
  const history = useHistory();  
  const {rooms, user} = useLazyLoadQuery(query, {});

  const [error, setError] = useState('');
  const [modalOn, setModalOn] = useState(null);

  const addRoomHandler = (turnOn) => 
    () => {setModalOn(turnOn === true ? 'addRoom' : null)};
  const roomHandler = (roomID) => () => {
    history.push({pathname: "/room", search: `?id=${roomID}`});
  }

  useAuthLogoutListener();
  return (
    <div className="home">
      <Navbar
        title={`Hello ${user.givenName}, what would you like to do?`}
        user={user}
      />
      {error != null && <div className="homeError">{error}</div>}
      <div
        className="homeButton homeCreateButton"
        onClick={addRoomHandler(true)}>
        {`+ New Music Room`}
      </div>
      <div>
        <div>My Rooms</div>
        {rooms && rooms.map(room =>
          <div
            key={room.id}
            className="homeRoomContainer"
            onClick={roomHandler(room.id)}>
            <Avatar title={room.creator.givenName} url={room.creator.picture} />
            <div>{room.name}</div>
            <div></div>
          </div>
        )}
      </div>
      <AddRoomModal
        modalOn={modalOn === 'addRoom'}
        onError={setError}
        turnOff={addRoomHandler(false)}
      />
    </div>
  );
}

export default Home;

import Auth from '../../utils/Auth'
import Navbar from '../Navbar.react';
import React from 'react';

import graphql from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useHistory} from "react-router-dom";
import useAuthLogoutListener from '../../utils/useAuthLogoutListener'

import './Room.css';

const query = graphql`
  query RoomQuery($id: String!) { 
    room(id: $id) {
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

const {useState} = React;

function Room(props) {
  const history = useHistory();  
  const urlParams = new URLSearchParams(window.location.search);

  const {room, user} = useLazyLoadQuery(query, {id: urlParams.get('id')});

  const [error, setError] = useState('');
  const [modalOn, setModalOn] = useState(null);

  const logoutHandler = () => {
    Auth.logout();
    history.push({pathname: "/login", state: {isLogout: true}});
  };

  useAuthLogoutListener();

  return (
    <div className="room">
      <Navbar title={room.name} user={user}/>
      <div className="roomContainer">
        <div className="roomContent">
          Player
        </div>
        <div className="roomContent">
          Friends in this room
          <div className="roomButton roomCreateButton">
            Add Friends
          </div>
          <div className="roomButton roomCreateButton">
            Add Music
          </div>
        </div>
      </div>
    </div>
  );
}

export default Room;

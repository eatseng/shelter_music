import AddInvites from './AddInvites.react';
import AddMusic from './AddMusic.react';
import Auth from '../../utils/Auth';
import Modal from '../Modal.react';
import Navbar from '../Navbar.react';
import React from 'react';

import graphql from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useHistory} from "react-router-dom";
import useAuthLogoutListener from '../../utils/useAuthLogoutListener';

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

  const modalHandler = (turnOn, type) => 
    () => {setModalOn(turnOn === true ? type : null)};

  useAuthLogoutListener();

  return (
    <div className="room">
      <Navbar title={room.name} user={user}/>
      {error != null && <div className="homeError">{error}</div>}
      <div className="roomContainer">
        <div className="roomContent roomPlayer">
          Player
        </div>
        <div className="roomContent">
          Friends in this room
          <div 
            className="roomButton roomCreateButton"
            onClick={modalHandler(true, 'addFriends')}>
            Add Friends
          </div>
          <div
            className="roomButton roomCreateButton"
            onClick={modalHandler(true, 'addMusic')}>
            Add Music
          </div>
        </div>
      </div>
      {modalOn === 'addFriends' &&
        <Modal
          isModalOn={modalOn === 'addFriends'}
          turnOff={modalHandler(false, 'addFriends')}>
          <AddInvites
            onError={setError}
            room={room}
            turnOff={modalHandler(false, 'addFriends')}
          />
        </Modal>
      }
      <Modal
        isModalOn={modalOn === 'addMusic'}
        turnOff={modalHandler(false, 'addMusic')}>
        <AddMusic
          onError={setError}
          turnOff={modalHandler(false, 'addMusic')}
        />
      </Modal>
    </div>
  );
}

export default Room;

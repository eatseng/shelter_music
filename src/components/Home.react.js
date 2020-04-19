import AddRoom from './room/AddRoom.react'
import Avatar from './user/Avatar.react'
import Modal from './Modal.react'
import Navbar from './Navbar.react'
import React from 'react';

import graphql from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from 'react-relay/hooks';
import {useHistory} from "react-router-dom";
import useAuthLogoutListener from '../utils/useAuthLogoutListener'

import './Home.css';

const {useState} = React;

const query = graphql`
  query HomeQuery { 
    home {
      ... on Home {
        rooms(
          first: 2147483647, # max GraphQLInt
        ) @connection(key: "Home_rooms") {
          edges {
            node {
              creator {
                ... on User {
                  givenName
                  picture
                }
              }
              id
              name
            }
          }
        }
      }
    }
    user {
      givenName
      picture
    }
  }
`;

function Home(props) {
  const history = useHistory();  
  const {home: {rooms}, user} = useLazyLoadQuery(query, {});

  const [error, setError] = useState('');
  const [modalOn, setModalOn] = useState(null);

  const addRoomModalHandler = (turnOn) => 
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
        onClick={addRoomModalHandler(true)}>
        {`+ New Music Room`}
      </div>
      <div>
        <div>My Rooms</div>
        {
          (rooms?.edges || [])
            .map(edge => edge.node)
            .map(room =>
              <div
                key={room.id}
                className="homeRoomContainer"
                onClick={roomHandler(room.id)}>
                <Avatar
                  title={room?.creator?.givenName}
                  url={room?.creator?.picture}
                />
                <div>{room.name}</div>
                <div></div>
              </div>
            )
        }
      </div>
      {modalOn === 'addRoom' && 
        <Modal
          isModalOn={modalOn === 'addRoom'}
          turnOff={addRoomModalHandler(false)}>
          <AddRoom
            onError={setError}
            turnOff={addRoomModalHandler(false)}
          />
        </Modal>
      }
    </div>
  );
}

export default Home;

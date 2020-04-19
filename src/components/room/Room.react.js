import AddInvites from './AddInvites.react';
import AddMusic from './AddMusic.react';
import Avatar from '../user/Avatar.react';
import Modal from '../Modal.react';
import Navbar from '../Navbar.react';
import React from 'react';
import Youtube from '../../utils/Youtube';

import graphql from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from 'react-relay/hooks';
import useAuthLogoutListener from '../../utils/useAuthLogoutListener';

import './Room.css';

const {useEffect, useState} = React;

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
      videos (
        first: 2147483647, # max GraphQLInt
      ) @connection(key: "Room_videos"){
        edges {
          node {
            addedBy {
              ... on User {
                givenName
                picture
              }
            }
            description
            id
            publishedAt
            thumbnails {
              default {
                height
                width
                url
              }
            }
            title
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

function Room(props) {
  const urlParams = new URLSearchParams(window.location.search);

  const {room, user} = useLazyLoadQuery(query, {id: urlParams.get('id')});

  const [error, setError] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [modalOn, setModalOn] = useState(null);
  const [youtube, setYoutube] = useState(null);

  const modalHandler = (turnOn, type) => 
    () => {setModalOn(turnOn === true ? type : null)};

  const onPlayerReady = (event) => setYoutube(event.target);

  useAuthLogoutListener();
  
  useEffect(() => {
    const playerDiv = document.getElementById('player');
    if (playerDiv == null) {
      const playerContainer = document.getElementById('playerContainer');
      const playlistDiv = document.getElementById('playlist');
      const player = document.createElement("div");
      player.setAttribute('id', 'player')
      playerContainer.insertBefore(player, playlistDiv);
    }

    Youtube.setCallback('Room', onPlayerReady)
    Youtube.getNewPlayer();

    return () => {
      setYoutube(null);
      setIsInitialized(false);
      Youtube.removeCallback('Room', onPlayerReady);
      Youtube.destroyPlayer();
    };
  }, []);

  useEffect(() => {
    if (
      isInitialized === false &&
      youtube != null &&
      room?.videos?.edges != null && room.videos.edges.length > 0
    ) {
      youtube.loadPlaylist((room.videos.edges || [])
        .map(edge => edge.node)
        .map(video => video.id),
      );
      setIsInitialized(true);
    }
  }, [isInitialized, room?.videos?.edges, youtube])

  return (
    <div className="room">
      <Navbar title={room.name} user={user}/>
      {error != null && <div className="homeError">{error}</div>}
      <div className="roomContainer">
        <div className="roomContent" id="playerContainer">
          <div className="roomPlayer" id="player">
            Player
          </div>
          <div className="roomList" id="playlist">
            {
              (room.videos.edges || [])
                .map(edge => edge.node)
                .map(video =>
                  <div 
                    className="addInvitesRow"
                    key={video.id}>
                    <Avatar
                      title={video?.addedBy?.givenName}
                      url={video?.addedBy?.picture}
                    />
                    <Avatar
                      title={video?.title}
                      url={video?.thumbnails?.default?.url}
                    />
                    <div>{video?.title}</div>
                  </div>
                )
            }
          </div>
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
      {modalOn === 'addMusic' &&
        <Modal
          isModalOn={modalOn === 'addMusic'}
          turnOff={modalHandler(false, 'addMusic')}>
          <AddMusic
            onError={setError}
            room={room}
            turnOff={modalHandler(false, 'addMusic')}
          />
        </Modal>
      }
    </div>
  );
}

export default Room;

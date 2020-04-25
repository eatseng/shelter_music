import AddInvites from './AddInvites.react';
import AddMusic from './AddMusic.react';
import Avatar from '../user/Avatar.react';
import Modal from '../Modal.react';
import MQTT from '../../utils/MQTT';
import Navbar from '../Navbar.react';
import OmniPlayer from '../../utils/OmniPlayer';
import React from 'react';

import commit from '../../relay/mutations/UpdateRoomVideoMutation'
import enableVotingCommit from '../../relay/mutations/EnableVotingMutation'
import graphql from 'babel-plugin-relay/macro';
import leaveRoomCommit from '../../relay/mutations/LeaveRoomMutation';
import {
  fetchQuery,
  useLazyLoadQuery,
  useRelayEnvironment
} from 'react-relay/hooks';
import useAuthLogoutListener from '../../utils/useAuthLogoutListener';

import './Room.css';

const {useCallback, useEffect, useMemo, useState} = React;

const MAX_GRAPHQL_INT = 2147483647;

const query = graphql`
  query RoomQuery($id: String!) { 
    room(id: $id) {
      creator {
        ... on User {
          id
          givenName
          picture
        }
      }
      id
      isVotingEnabled
      name
      onlineParticipants(first: 2147483647) {
        edges {
          node {
            ... on User {
              givenName
              picture
            }
          }
        }
      }
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
            playAt
            publishedAt
            thumbnails {
              default {
                height
                width
                url
              }
            }
            title
            videoID
            votes (
              first: 2147483647, # max GraphQLInt
            ) @connection(key: "Room_video_votes"){
              edges {
                node {
                  id
                  userID
                }
              }
            }
          }
        }
      }
    }
    user {
      givenName
      id
      picture
    }
  }
`;

function Room(props) {
  const urlParams = new URLSearchParams(window.location.search);

  const environment = useRelayEnvironment();
  const {room, user} = useLazyLoadQuery(
    query,
    {id: urlParams.get('id')},
    {fetchPolicy: 'store-and-network'}
  );

  const [currentVideoID, setCurrentVideoID] = useState(null);
  const [error, setError] = useState('');
  const [modalOn, setModalOn] = useState(null);
  const [airTime, setAirTime] = useState(0);
  const [playerState, setPlayerState] = useState(null);
  const [prevVideo, setPrevVideo] = useState(null);

  const modalHandler = (turnOn, type) => 
    () => {setModalOn(turnOn === true ? type : null)};

  const [video] = useMemo(() => {
    return (room?.videos?.edges || [])
      .map(edge => edge.node)
      .filter(video => video.videoID === currentVideoID);
  }, [currentVideoID, room]);

  const [vote] = useMemo(() => {
    return (video?.votes?.edges || [])
      .map(edge => edge.node)
      .filter(vote => vote.userID === user.id);
  }, [user.id, video]);

  const onPlayerStateChange = (event) => {
    if (event.data === 1 && event.target != null) {
      const len = event.target.getVideoUrl().split('v=').length || 0;
      setCurrentVideoID(event.target.getVideoUrl().split('v=')[len - 1]);
    }
    setPlayerState(event.data);
  };

  const onRoomMessage = (message) => {
    fetchQuery(
      environment,
      query,
      {id: urlParams.get('id')},
    )
      .toPromise();
  }

  const enableVotingHandler = useCallback(() => {
    enableVotingCommit(
      environment,
      {
        roomID: room.id,
        isEnableVoting: !room?.isVotingEnabled
      },
      {
        onSuccess: (resp) => setError(resp.enable.error || ''),
        onError: (error) => setError('Relay transport failure.'),
      },
    );
  }, [room])
  
  const updateVideoHandler = useCallback((_, isVideoPlaying = false) => {
    if (video != null) {
      commit(
        environment,
        {
          room: {
            creator: room?.creator,
            id: room?.id,
            name: room?.name,
          },
          video: {
            id: video.id,
            isVideoPlaying,
            isVoted: vote == null,
            thumbnails: video.thumbnails,
            title: video.title,
            videoID: video.videoID,
          },
          vote: {
            id: vote?.id,
            userID: vote?.userID,
          },
        },
        {
          onSuccess: (resp) => setError(resp.update.error || ''),
          onError: (error) => setError('Relay transport failure.'),
        },
      );
    }
  }, [environment, vote, room, video]);

  useAuthLogoutListener();
  
  useEffect(() => {
    const playerDiv = document.getElementById('player');
    if (playerDiv == null) {
      const playerContainer = document.getElementById('playerContainer');
      const playlistDiv = document.getElementById('playlist');
      const player = document.createElement("div");
      player.setAttribute('id', 'player');
      playerContainer.insertBefore(player, playlistDiv);
    }
    MQTT.init();
    MQTT.addEventListener(`sheltermusic/${room.id}`, onRoomMessage);
    OmniPlayer.init();
    OmniPlayer.addEventListener('onStateChange', onPlayerStateChange);
    return () => {
      MQTT.removeEventListener(`sheltermusic/${room.id}`, onRoomMessage);
      MQTT.cleanUp();
      OmniPlayer.removeEventListener('onStateChange', onPlayerStateChange);
      OmniPlayer.cleanUp();
      leaveRoomCommit(environment, {roomID: room?.id});
    };
  }, []);

  useEffect(() => {
    OmniPlayer.setPlaylist((room?.videos?.edges || []).map(edge => edge.node));
  }, [room])

  useEffect(() => {
    if (playerState === 1 && video?.playAt != prevVideo?.playAt) {
      updateVideoHandler(null, true /* isVideoPlaying set initial playAt */);
      setPrevVideo(video);
    }
  }, [playerState, prevVideo, video, updateVideoHandler]);

  useEffect(() => {
    const refetchTimerID = setInterval(() => {
      fetchQuery(environment, query, {id: urlParams.get('id')}).toPromise();
    }, 15000);
    return () => clearInterval(refetchTimerID);
  }, [video?.playAt]);

  useEffect(() => {
    const timerID = setInterval(
      () =>{
        if (Math.floor(Date.now() / 1000) - video?.playAt === 30) {
          fetchQuery(environment, query, {id: urlParams.get('id')})
            .toPromise();
        }
        setAirTime(
          video != null ? Math.floor(Date.now() / 1000) - video.playAt : 0,
        );
      },
      1000,
    );
    return () => clearInterval(timerID);
  }, [video])

  return (
    <div className="room">
      <Navbar title={room?.name} user={user}/>
      {error != null && <div className="homeError">{error}</div>}
      <div className="roomContainer">
        <div className="roomContent" id="playerContainer">
          <div className="roomPlayer" id="player">
            Player
          </div>
          <div className="roomList" id="playlist">
            {
              (room?.videos?.edges || [])
                .map(edge => edge.node)
                .map(video =>
                  <div 
                    className="addInvitesRow"
                    key={`${video.id}`}>
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
          <div>
            {`On the air for ${Math.floor(airTime/60)}min ${
              airTime % 60 < 10 ? '0' + airTime % 60 : airTime % 60
            } secs`}
          </div>
          <div>Friends in this room</div>
          <div className="roomFriends">
            {
              (room?.onlineParticipants?.edges || [])
                .map(edge => edge.node)
                .map(friend =>
                    <Avatar
                      key={friend.picture}
                      title={friend.givenName}
                      tooltip={true}
                      url={friend.picture} />
                )
            }
          </div>
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
          {
            video != null 
              ? <div
                  className="roomButton roomCreateButton"
                  onClick={updateVideoHandler}>
                  {vote == null ? 'Thumbs up' : 'Thumbs back down'}
                </div>
              : <div className="roomButton roomCreateButton">
                  Video stopped
                </div>
          }
          {
            user.id === room?.creator?.id && <div
              className="roomButton roomCreateButton"
              onClick={enableVotingHandler}>
              {`${room?.isVotingEnabled !== true ? 'Enable' : 'Disable'} Voting`}
            </div>
          }
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

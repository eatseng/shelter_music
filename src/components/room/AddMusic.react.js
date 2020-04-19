import Avatar from '../user/Avatar.react';
import React from 'react';
import {useRelayEnvironment} from 'react-relay/hooks';

import commit from '../../relay/mutations/AddRoomVideoMutation'

import './AddMusic.css';

const {useCallback, useState} = React;

const DEBOUNCE_MS = 250;

function AddMusic(props) {
  const environment = useRelayEnvironment();
  const [videos, setVideos] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [timeoutID, setTimeoutID] = useState(null);

  const checkHandler = useCallback((video) =>
    (event) => {
      setSelectedVideos({
        ...selectedVideos,
        [video.id.videoId]: event.target.checked ? video : false,
      })
    }, [selectedVideos]
  );

  const createHandler = useCallback(() => {
    commit(
      environment,
      {
        videos: Object.keys(selectedVideos)
          .map(id => selectedVideos[id])
          .filter(video => video)
          .map(video => {
            return {
              id: video.id.videoId,
              description: video.snippet.description,
              publishedAt: video.snippet.publishedAt,
              thumbnails: video.snippet.thumbnails,
              title: video.snippet.title,
            };
          }),
        room: {
          creator: props.room.creator,
          id: props.room.id,
          name: props.room.name,
        },
      },
      {
        onSuccess: (resp) => props.onError(resp.add.error || ''),
        onError: (error) => {console.log(error);props.onError('Relay transport failure.')},
      },
    );
    setSearchString('');
    props.turnOff();
  }, [environment, searchString, selectedVideos]);

  const userInputHandler = (e) => {
    setSearchString(e.target.value)
    const value = e.target.value;

    clearTimeout(timeoutID);
    setTimeoutID(setTimeout(() => {
      window['gapi'].client.youtube.search.list({
        "part": "snippet",
        "maxResults": 30,
        "q": value,
      })
        .then(
          (response) => setVideos(response?.result?.items),
          (error) => props.onError(error) 
        );
    }, DEBOUNCE_MS))
  };

  return (
    <div className="addMusicContainer">
      <div className="addMusicTitle">{`New Music Room - Add music`}</div>
      <input className="addMusicInput"
        onChange={userInputHandler}
        placeholder="find music"
        type="text"
        value={searchString}
      />
      <div className="addMusicVideos">
        {
          (videos || [])
            .filter(video => video.id.kind === "youtube#video")
            .map(video =>
              <div 
                className="addInvitesRow"
                key={video.id.videoId}>
                <Avatar
                  title={video?.snippet?.title}
                  url={video?.snippet?.thumbnails?.default?.url}
                />
                <div>{video?.snippet?.title}</div>
                <input
                  onChange={checkHandler(video)}
                  type="checkbox"
                  value={selectedVideos[video.id.videoId]}
                />
              </div>
            )
        }
      </div>
      <div
        className="addMusicCreateButton"
        onClick={createHandler}>
        Add Music
      </div>
    </div>
  );
}

export default AddMusic;

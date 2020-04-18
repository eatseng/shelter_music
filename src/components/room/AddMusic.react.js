import React from 'react';
import {useRelayEnvironment} from 'react-relay/hooks';
// import commit from '../../relay/mutations/UpsertInvitesMutation'

import './AddMusic.css';

const {useCallback, useState} = React;

function AddMusic(props) {
  const environment = useRelayEnvironment();
  const [music, setMusic] = useState({name: ''});

  const createHandler = useCallback(() => {
    props.turnOff();
    // commit(
    //   environment,
    //   invite,
    //   {
    //     onSuccess: (resp) => {
    //       console.log('onRelaySuccess', resp);
    //       props.onError(resp.upsertinvite.error || '');
    //     },
    //     onError: (error) => console.log('onRelayFailure', error),
    //   },
    // );
    setMusic({name: ''});
  }, [environment, music]);
  const userInputHandler = (e) => setMusic({name: e.target.value});

  return (
    <div className="addMusicContainer">
      <div className="addMusicTitle">{`New Music Room - Add music`}</div>
      <input className="addMusicInput"
        onChange={userInputHandler}
        type="text"
        value={music.name}
      />
      <div
        className="addMusicCreateButton"
        onClick={createHandler}>
        Add Music
      </div>
    </div>
  );
}

export default AddMusic;

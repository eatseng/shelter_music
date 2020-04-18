import React from 'react';
import {useRelayEnvironment} from 'react-relay/hooks';
import commit from '../../relay/mutations/UpsertRoomMutation'

import './AddRoom.css';

const {useCallback, useState} = React;

function AddRoom(props) {
  const environment = useRelayEnvironment();
  const [room, setRoom] = useState({name: ''});

  const createHandler = useCallback(() => {
    props.turnOff();
    commit(
      environment,
      room,
      {
        onSuccess: (resp) => {
          console.log('onRelaySuccess', resp);
          props.onError(resp.upsertRoom.error || '');
        },
        onError: (error) => console.log('onRelayFailure', error),
      },
    );
    setRoom({name: ''});
  }, [environment, room]);
  const userInputHandler = (e) => setRoom({name: e.target.value});

  return (
    <div className="addRoomContainer">
      <div className="addRoomTitle">{`New Music Room - Add title`}</div>
      <input className="addRoomInput"
        placeholder="New Music Room"
        onChange={userInputHandler}
        type="text"
        value={room.name}
      />
      <div
        className="addRoomCreateButton"
        onClick={createHandler}>
        Create Room
      </div>
    </div>
  );
}

export default AddRoom;

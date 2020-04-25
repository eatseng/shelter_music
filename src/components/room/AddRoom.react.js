import React from 'react';

import commit from '../../relay/mutations/CreateRoomMutation'
import {useHistory} from "react-router-dom";
import {useRelayEnvironment} from 'react-relay/hooks';

import './AddRoom.css';

const {useCallback, useState} = React;

function AddRoom(props) {
  const environment = useRelayEnvironment();
  const history = useHistory();

  const [room, setRoom] = useState({name: ''});

  const createHandler = useCallback(() => {
    commit(
      environment,
      room,
      {
        onSuccess: (resp) => {
          props.onError(resp.create.error || '')
          history.push(
            {pathname: "/room", search: `?id=${resp.create.room.id}`},
          );
        },
        onError: (error) => props.onError('Relay transport error'),
      },
    );
    setRoom({name: ''});
  }, [environment, history, props, room]);
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

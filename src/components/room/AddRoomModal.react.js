import React from 'react';
import {useRelayEnvironment} from 'react-relay/hooks';
import commit from '../../relay/mutations/UpsertRoomMutation'

import './AddRoomModal.css';

const {useEffect, useState} = React;

const {useCallback} = React;

function AddRoomModal(props) {
  const environment = useRelayEnvironment();
  const [room, setRoom] = useState({name: ''});

  const userInputHandler = (e) => setRoom({name: e.target.value});
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

  useEffect(() => {
    const keypressHandler = (e) => {
      if (e.code === "Escape") {
        props.turnOff();
      }
    }
    document.addEventListener('keyup', keypressHandler)
    return () => document.removeEventListener('keyup', keypressHandler)
  })

  return (
    <div
      className="addRoomModal"
      style={{display: props.modalOn === true ? 'flex' : 'none'}}>
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
      <div className="addRoomModalScreen" />
    </div>
  );
}

export default AddRoomModal;

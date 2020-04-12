import React from 'react';
import {useRelayEnvironment} from 'react-relay/hooks';
import commit from '../../relay/mutations/UpsertRoomMutation'

import './AddRoomModal.css';

const {useCallback} = React;

function AddRoomModal(props) {
  const environment = useRelayEnvironment();
  const input = {name: 'testing'};

  const createHandler = useCallback(() => {
    props.turnOff();
    commit(
      environment,
      input,
      {
        onSuccess: (resp) => console.log('onRelaySuccess', resp),
        onError: (error) => console.log('onRelayFailure', error),
      },
    );
  }, [environment, input]);

  return (
    <div
      className="addRoomModal"
      style={{display: props.modalOn === true ? 'flex' : 'none'}}>
      <div className="addRoomContainer">
        <div className="addRoomTitle">{`New Music Room - Add title`}</div>
        <input className="addRoomInput"
          placeholder="New Music Room"
          type="text"
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

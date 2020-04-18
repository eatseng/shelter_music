import Avatar from '../user/Avatar.react'
import React from 'react';
import {useRelayEnvironment} from 'react-relay/hooks';
import commit from '../../relay/mutations/CreateInviteMutation'

import graphql from 'babel-plugin-relay/macro';
import {useLazyLoadQuery} from 'react-relay/hooks';

import './AddInvites.css';

const {useCallback, useState} = React;

const query = graphql`
  query AddInvitesQuery { 
    users {
      ... on User {
        givenName
        id
        name
        picture
      }
    }
  }
`;

function AddInvites(props) {
  const environment = useRelayEnvironment();
  const [searchString, setsearchString] = useState('');
  const [invitees, setInvitees] = useState({});

  const {users} = useLazyLoadQuery(query, {});

  const checkHandler = useCallback((user) =>
    (event) => {
      setInvitees({
        ...invitees,
        [user.id]: event.target.checked ? user : false,
      })
    }, [invitees]
  );
  const createHandler = useCallback(() => {
    commit(
      environment,
      {
        invitees: Object.keys(invitees)
          .map(id => invitees[id])
          .filter(invitee => invitee),
        room: props.room
      },
      {
        onSuccess: (resp) => {
          console.log('onRelaySuccess', resp);
          props.onError(resp.create?.error || '');
        },
        onError: (error) => console.log('onRelayFailure', error),
      },
    );
    setsearchString('');
    props.turnOff();
  }, [environment, invitees]);
  const userInputHandler = (e) => setsearchString(e.target.value);
  
  return (
    <div className="addInvitesContainer">
      <div className="addInvitesTitle">{`New Music Room - Add friends`}</div>
      <input className="addInvitesInput"
        onChange={userInputHandler}
        placeholder="find people"
        type="text"
        value={searchString.name}
      />
      {
        (users || [])
          .filter(
            user => user.name.toUpperCase().includes(searchString.toUpperCase())
          )
          .map(user =>
            <div className="addInvitesRow" key={user.picture}>
              <Avatar title={user.name} url={user.picture} />
              <div>{user.name}</div>
              <input
                onChange={checkHandler(user)}
                type="checkbox"
                value={invitees[user.id]}
              />
            </div>
          )
      }
      <div
        className="addInvitesCreateButton"
        onClick={createHandler}>
        Create Friend
      </div>
    </div>
  );
}

export default AddInvites;

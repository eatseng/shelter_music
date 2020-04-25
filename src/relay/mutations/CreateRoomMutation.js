import {ConnectionHandler} from 'relay-runtime';
import {commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  mutation CreateRoomMutation($input: CreateRoomInput!) {
    create: createRoom(input: $input) {
      error
      room {
        ... on Room {
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
`;

function CreateRoomMutation (
  environment,
  input,
  callback,
) {
  return commitMutation(
    environment,
    {
      mutation: query,
      variables: {input},
      onCompleted: callback.onSuccess,
      onError: callback.onError,
      updater: (store) => {
        const connection = ConnectionHandler.getConnection(
          store.get('home_001'),
          'Home_rooms'
        );

        const newRoomEdge = ConnectionHandler.createEdge(
          store,
          connection,
          store.getRootField('createRoom').getLinkedRecord('room'),
          'RoomEdge'
        )
        
        ConnectionHandler.insertEdgeAfter(connection, newRoomEdge)
      },
    }
  );
}

export default CreateRoomMutation
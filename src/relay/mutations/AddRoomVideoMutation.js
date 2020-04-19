import {ConnectionHandler} from 'relay-runtime';
import {commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  mutation AddRoomVideoMutation($input: AddRoomVideoInput!) {
    add: addRoomVideo(input: $input) {
      error
      videos {
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
`;

function AddRoomVideoMutation (
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
          store.get(input.room.id),
          'Room_videos'
        );

        store
          .getRootField('addRoomVideo')
          .getLinkedRecords('videos')
          .forEach(newVideo => {
            const newVideoEdge = ConnectionHandler.createEdge(
              store,
              connection,
              newVideo,
              'VideoEdge'
            );        
            ConnectionHandler.insertEdgeAfter(connection, newVideoEdge);
          });
      },
    },
  );
}

export default AddRoomVideoMutation
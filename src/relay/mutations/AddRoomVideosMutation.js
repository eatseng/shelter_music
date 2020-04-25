import {ConnectionHandler} from 'relay-runtime';
import {commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  mutation AddRoomVideosMutation($input: AddRoomVideosInput!) {
    add: addRoomVideos(input: $input) {
      error
      videos {
        ... on Video {
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
`;

function AddRoomVideosMutation (
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
          .getRootField('addRoomVideos')
          .getLinkedRecords('videos')
          .forEach(newVideo => {
            
            newVideo.setValue(Math.floor(Date.now() / 1000), 'playAt');
            
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

export default AddRoomVideosMutation
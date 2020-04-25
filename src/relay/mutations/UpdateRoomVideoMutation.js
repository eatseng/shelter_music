import {ConnectionHandler} from 'relay-runtime';
import {commitMutation} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const query = graphql`
  mutation UpdateRoomVideoMutation($input: UpdateRoomVideoInput!) {
    update: updateRoomVideo(input: $input) {
      error
      vote {
        id
        userID
      }
    }
  }
`;

function UpdateRoomVideoMutation (
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
        
        if (input.video.isVideoPlaying !== true)  {

          const votes = ConnectionHandler.getConnection(
            store.get(input.video.id), /* video node */
            'Room_video_votes'
          );

          if (input.video.isVoted === true) {

            const newVoteEdge = ConnectionHandler.createEdge(
                store,
                votes,
                store.getRootField('updateRoomVideo').getLinkedRecord('vote'),
                'VideoVoteEdge'
              );        
            ConnectionHandler.insertEdgeAfter(votes, newVoteEdge);

          } else {

            ConnectionHandler.deleteNode(votes, input.vote.id);

          }
        }
      },
    },
  );
}

export default UpdateRoomVideoMutation
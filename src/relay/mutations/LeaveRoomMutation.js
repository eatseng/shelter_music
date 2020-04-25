import graphql from 'babel-plugin-relay/macro';
import {commitMutation} from 'react-relay';

const query = graphql`
  mutation LeaveRoomMutation($input: LeaveRoomInput!) {
    leave: leaveRoom(input: $input) {
      isLeft
    }
  }
`;

function LeaveRoomMutation (
  environment,
  input,
) {
  return commitMutation(
    environment,
    {
      mutation: query,
      variables: {input},
    }
  );
}

export default LeaveRoomMutation
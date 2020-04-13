import graphql from 'babel-plugin-relay/macro';
import {commitMutation} from 'react-relay';

const query = graphql`
  mutation UpsertRoomMutation($input: UpsertRoomInput!) {
    upsert: upsertRoom(input: $input) {
      error
      room {
        ... on Room {
          name
        }
      }
    }
  }
`;

function UpsertRoomMutation (
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
    }
  );
}

export default UpsertRoomMutation
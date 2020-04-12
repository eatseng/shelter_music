import graphql from 'babel-plugin-relay/macro';
import {commitMutation} from 'react-relay';

type UpsertRoomData = {
  name: String,
};

const query = graphql`
  mutation UpsertRoomMutation($input: UpsertRoomInput!) {
    upsertRoom(input: $input) {
      name
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
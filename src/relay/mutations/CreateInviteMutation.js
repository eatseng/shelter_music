import graphql from 'babel-plugin-relay/macro';
import {commitMutation} from 'react-relay';

const query = graphql`
  mutation CreateInviteMutation($input: CreateInviteInput!) {
    create: createInvite(input: $input) {
      error
    }
  }
`;

function CreateInviteMutation (
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

export default CreateInviteMutation
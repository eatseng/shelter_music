import graphql from 'babel-plugin-relay/macro';
import {commitMutation} from 'react-relay';

const query = graphql`
  mutation EnableVotingMutation($input: EnableVotingInput!) {
    enable: enableVoting(input: $input) {
      error
      isVotingEnabled
    }
  }
`;

function EnableVotingMutation (
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

        const isVotingEnabled = store
          .getRootField('enableVoting')
          .getValue('isVotingEnabled');

        store.get(input.roomID).setValue(isVotingEnabled, 'isVotingEnabled');

      },
    }
  );
}

export default EnableVotingMutation
/**
 * @flow
 * @relayHash c71b6da118fb6aa463aec8d3f166909c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type EnableVotingInput = {|
  roomID: string,
  isEnableVoting: boolean,
|};
export type EnableVotingMutationVariables = {|
  input: EnableVotingInput
|};
export type EnableVotingMutationResponse = {|
  +enable: ?{|
    +error: ?string,
    +isVotingEnabled: ?boolean,
  |}
|};
export type EnableVotingMutation = {|
  variables: EnableVotingMutationVariables,
  response: EnableVotingMutationResponse,
|};
*/


/*
mutation EnableVotingMutation(
  $input: EnableVotingInput!
) {
  enable: enableVoting(input: $input) {
    error
    isVotingEnabled
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "EnableVotingInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "enable",
    "name": "enableVoting",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "EnableVotingMutationPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "error",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isVotingEnabled",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "EnableVotingMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "EnableVotingMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "EnableVotingMutation",
    "id": null,
    "text": "mutation EnableVotingMutation(\n  $input: EnableVotingInput!\n) {\n  enable: enableVoting(input: $input) {\n    error\n    isVotingEnabled\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3a019742b32e7462f867a693296f6030';

module.exports = node;

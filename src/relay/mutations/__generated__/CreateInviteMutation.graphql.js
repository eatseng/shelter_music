/**
 * @flow
 * @relayHash ac890a9b26bb16093134762c8e3066e4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateInviteInput = {|
  invitees?: ?$ReadOnlyArray<UserInput>,
  room: RoomInput,
|};
export type UserInput = {|
  givenName: string,
  id?: ?string,
  name?: ?string,
  picture: string,
|};
export type RoomInput = {|
  creator: UserInput,
  id: string,
  name: string,
|};
export type CreateInviteMutationVariables = {|
  input: CreateInviteInput
|};
export type CreateInviteMutationResponse = {|
  +create: ?{|
    +error: ?string
  |}
|};
export type CreateInviteMutation = {|
  variables: CreateInviteMutationVariables,
  response: CreateInviteMutationResponse,
|};
*/


/*
mutation CreateInviteMutation(
  $input: CreateInviteInput!
) {
  create: createInvite(input: $input) {
    error
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "CreateInviteInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "create",
    "name": "createInvite",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "InviteMutationPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "error",
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
    "name": "CreateInviteMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateInviteMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateInviteMutation",
    "id": null,
    "text": "mutation CreateInviteMutation(\n  $input: CreateInviteInput!\n) {\n  create: createInvite(input: $input) {\n    error\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0e895ee27b6ee11f8bc0728507e6af3e';

module.exports = node;

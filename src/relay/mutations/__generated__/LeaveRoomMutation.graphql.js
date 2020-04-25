/**
 * @flow
 * @relayHash 1c0f851d3846881bc256c98fc99cf8fe
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LeaveRoomInput = {|
  roomID: string
|};
export type LeaveRoomMutationVariables = {|
  input: LeaveRoomInput
|};
export type LeaveRoomMutationResponse = {|
  +leave: ?{|
    +isLeft: ?boolean
  |}
|};
export type LeaveRoomMutation = {|
  variables: LeaveRoomMutationVariables,
  response: LeaveRoomMutationResponse,
|};
*/


/*
mutation LeaveRoomMutation(
  $input: LeaveRoomInput!
) {
  leave: leaveRoom(input: $input) {
    isLeft
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "LeaveRoomInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "leave",
    "name": "leaveRoom",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "LeaveRoomMutationPayload",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "isLeft",
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
    "name": "LeaveRoomMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "LeaveRoomMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "LeaveRoomMutation",
    "id": null,
    "text": "mutation LeaveRoomMutation(\n  $input: LeaveRoomInput!\n) {\n  leave: leaveRoom(input: $input) {\n    isLeft\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5697d74cdfb5b030b5b27c5a71b2c01e';

module.exports = node;

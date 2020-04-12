/**
 * @flow
 * @relayHash 93ae2f362919c93cbbf389a03ed910ea
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpsertRoomInput = {|
  name: string
|};
export type UpsertRoomMutationVariables = {|
  input: UpsertRoomInput
|};
export type UpsertRoomMutationResponse = {|
  +upsertRoom: ?{|
    +name: string
  |}
|};
export type UpsertRoomMutation = {|
  variables: UpsertRoomMutationVariables,
  response: UpsertRoomMutationResponse,
|};
*/


/*
mutation UpsertRoomMutation(
  $input: UpsertRoomInput!
) {
  upsertRoom(input: $input) {
    name
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpsertRoomInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "upsertRoom",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Room",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "name",
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
    "name": "UpsertRoomMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpsertRoomMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpsertRoomMutation",
    "id": null,
    "text": "mutation UpsertRoomMutation(\n  $input: UpsertRoomInput!\n) {\n  upsertRoom(input: $input) {\n    name\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9abe48bba8eae01001611b19c60e151f';

module.exports = node;

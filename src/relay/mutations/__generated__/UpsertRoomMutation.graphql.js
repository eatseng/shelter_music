/**
 * @flow
 * @relayHash 57999de114033f315361f1dc47bf2871
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
  +upsert: ?{|
    +error: ?string,
    +room: ?{|
      +name: string
    |},
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
  upsert: upsertRoom(input: $input) {
    error
    room {
      name
    }
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
    "alias": "upsert",
    "name": "upsertRoom",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RoomMutationResponse",
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
        "kind": "LinkedField",
        "alias": null,
        "name": "room",
        "storageKey": null,
        "args": null,
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
    "text": "mutation UpsertRoomMutation(\n  $input: UpsertRoomInput!\n) {\n  upsert: upsertRoom(input: $input) {\n    error\n    room {\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a9444b61d25e809fec255b824f4459e4';

module.exports = node;

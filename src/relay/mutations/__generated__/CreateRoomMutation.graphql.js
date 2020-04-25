/**
 * @flow
 * @relayHash e9f21412a826f655715929e95702ea93
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type CreateRoomInput = {|
  name: string
|};
export type CreateRoomMutationVariables = {|
  input: CreateRoomInput
|};
export type CreateRoomMutationResponse = {|
  +create: ?{|
    +error: ?string,
    +room: ?{|
      +creator: ?{|
        +givenName: string,
        +picture: string,
      |},
      +id: ?string,
      +name: string,
    |},
  |}
|};
export type CreateRoomMutation = {|
  variables: CreateRoomMutationVariables,
  response: CreateRoomMutationResponse,
|};
*/


/*
mutation CreateRoomMutation(
  $input: CreateRoomInput!
) {
  create: createRoom(input: $input) {
    error
    room {
      creator {
        givenName
        picture
      }
      id
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
    "type": "CreateRoomInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "create",
    "name": "createRoom",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RoomMutationPayload",
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
            "kind": "LinkedField",
            "alias": null,
            "name": "creator",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "givenName",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "picture",
                "args": null,
                "storageKey": null
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
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
    "name": "CreateRoomMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "CreateRoomMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "CreateRoomMutation",
    "id": null,
    "text": "mutation CreateRoomMutation(\n  $input: CreateRoomInput!\n) {\n  create: createRoom(input: $input) {\n    error\n    room {\n      creator {\n        givenName\n        picture\n      }\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2edfc4742ee9da0b9c289efdaf3b18ff';

module.exports = node;

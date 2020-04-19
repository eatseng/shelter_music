/**
 * @flow
 * @relayHash 06d116216c278ae9f65b7ff79fee0c14
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
      +creator: ?{|
        +givenName: string,
        +picture: string,
      |},
      +id: ?string,
      +name: string,
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
    "text": "mutation UpsertRoomMutation(\n  $input: UpsertRoomInput!\n) {\n  upsert: upsertRoom(input: $input) {\n    error\n    room {\n      creator {\n        givenName\n        picture\n      }\n      id\n      name\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '7e3dad46447d6d2d08e93d3a69b08d56';

module.exports = node;

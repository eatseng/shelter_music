/**
 * @flow
 * @relayHash 2972ab6d69c0af0a7b40eac01634e894
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RoomQueryVariables = {|
  id: string
|};
export type RoomQueryResponse = {|
  +room: ?{|
    +creator: ?{|
      +givenName: string,
      +picture: string,
    |},
    +id: ?string,
    +name: string,
  |},
  +user: ?{|
    +givenName: string,
    +picture: string,
  |},
|};
export type RoomQuery = {|
  variables: RoomQueryVariables,
  response: RoomQueryResponse,
|};
*/


/*
query RoomQuery(
  $id: String!
) {
  room(id: $id) {
    creator {
      givenName
      picture
    }
    id
    name
  }
  user {
    givenName
    picture
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "String!",
    "defaultValue": null
  }
],
v1 = [
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
],
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "room",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
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
        "selections": (v1/*: any*/)
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
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "user",
    "storageKey": null,
    "args": null,
    "concreteType": "User",
    "plural": false,
    "selections": (v1/*: any*/)
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RoomQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "RoomQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v2/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "RoomQuery",
    "id": null,
    "text": "query RoomQuery(\n  $id: String!\n) {\n  room(id: $id) {\n    creator {\n      givenName\n      picture\n    }\n    id\n    name\n  }\n  user {\n    givenName\n    picture\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2f5e23e7a0b5afaaf9c4b5e0b2bd83f5';

module.exports = node;

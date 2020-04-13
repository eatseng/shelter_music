/**
 * @flow
 * @relayHash 089eec3845d4aab592ee1c51bf6a8c96
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HomeQueryVariables = {||};
export type HomeQueryResponse = {|
  +rooms: ?$ReadOnlyArray<{|
    +creator: ?{|
      +givenName: string,
      +picture: string,
    |},
    +id: ?string,
    +name: string,
  |}>,
  +user: ?{|
    +givenName: string,
    +picture: string,
  |},
|};
export type HomeQuery = {|
  variables: HomeQueryVariables,
  response: HomeQueryResponse,
|};
*/


/*
query HomeQuery {
  rooms {
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
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "rooms",
    "storageKey": null,
    "args": null,
    "concreteType": "Room",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "creator",
        "storageKey": null,
        "args": null,
        "concreteType": "User",
        "plural": false,
        "selections": (v0/*: any*/)
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
    "selections": (v0/*: any*/)
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "HomeQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "HomeQuery",
    "argumentDefinitions": [],
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "HomeQuery",
    "id": null,
    "text": "query HomeQuery {\n  rooms {\n    creator {\n      givenName\n      picture\n    }\n    id\n    name\n  }\n  user {\n    givenName\n    picture\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '996aefc7f941a3533415b1c02ce8f0f6';

module.exports = node;

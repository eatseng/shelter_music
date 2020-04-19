/**
 * @flow
 * @relayHash 7772d9cfefe036c8393b2c299579faa1
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type HomeQueryVariables = {||};
export type HomeQueryResponse = {|
  +home: ?{|
    +rooms: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +creator: ?{|
            +givenName: string,
            +picture: string,
          |},
          +id: ?string,
          +name: string,
        |}
      |}>
    |}
  |},
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
  home {
    rooms(first: 2147483647) {
      edges {
        node {
          creator {
            givenName
            picture
          }
          id
          name
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    id
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
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "RoomEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
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
            "selections": (v0/*: any*/)
          },
          (v1/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "name",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "cursor",
        "args": null,
        "storageKey": null
      }
    ]
  },
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "pageInfo",
    "storageKey": null,
    "args": null,
    "concreteType": "PageInfo",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "endCursor",
        "args": null,
        "storageKey": null
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "hasNextPage",
        "args": null,
        "storageKey": null
      }
    ]
  }
],
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "user",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": (v0/*: any*/)
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647
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
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "home",
        "storageKey": null,
        "args": null,
        "concreteType": "Home",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "rooms",
            "name": "__Home_rooms_connection",
            "storageKey": null,
            "args": null,
            "concreteType": "RoomConnection",
            "plural": false,
            "selections": (v2/*: any*/)
          }
        ]
      },
      (v3/*: any*/)
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "HomeQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "home",
        "storageKey": null,
        "args": null,
        "concreteType": "Home",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "rooms",
            "storageKey": "rooms(first:2147483647)",
            "args": (v4/*: any*/),
            "concreteType": "RoomConnection",
            "plural": false,
            "selections": (v2/*: any*/)
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "rooms",
            "args": (v4/*: any*/),
            "handle": "connection",
            "key": "Home_rooms",
            "filters": null
          },
          (v1/*: any*/)
        ]
      },
      (v3/*: any*/)
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "HomeQuery",
    "id": null,
    "text": "query HomeQuery {\n  home {\n    rooms(first: 2147483647) {\n      edges {\n        node {\n          creator {\n            givenName\n            picture\n          }\n          id\n          name\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n  user {\n    givenName\n    picture\n  }\n}\n",
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "home",
            "rooms"
          ]
        }
      ]
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fa3c6c58e21f9680613fd301a153e229';

module.exports = node;

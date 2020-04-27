/**
 * @flow
 * @relayHash c9ff511b4867e1f3856d1e9d0d02f272
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
    +roomInvites: ?{|
      +accepted: ?{|
        +edges: ?$ReadOnlyArray<{|
          +node: ?{|
            +creator: {|
              +givenName: string,
              +picture: string,
            |},
            +room: {|
              +id: ?string,
              +name: string,
            |},
          |}
        |}>
      |},
      +pending: ?{|
        +edges: ?$ReadOnlyArray<{|
          +node: ?{|
            +creator: {|
              +givenName: string,
              +picture: string,
            |},
            +room: {|
              +id: ?string,
              +name: string,
            |},
          |}
        |}>
      |},
      +rejected: ?{|
        +edges: ?$ReadOnlyArray<{|
          +node: ?{|
            +creator: {|
              +givenName: string,
              +picture: string,
            |},
            +room: {|
              +id: ?string,
              +name: string,
            |},
          |}
        |}>
      |},
    |},
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
    roomInvites {
      accepted {
        edges {
          node {
            creator {
              givenName
              picture
            }
            room {
              id
              name
            }
          }
        }
      }
      pending {
        edges {
          node {
            creator {
              givenName
              picture
            }
            room {
              id
              name
            }
          }
        }
      }
      rejected {
        edges {
          node {
            creator {
              givenName
              picture
            }
            room {
              id
              name
            }
          }
        }
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "givenName",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "picture",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "creator",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/)
  ]
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v5 = [
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
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
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
v6 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "InviteEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "Invite",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "room",
            "storageKey": null,
            "args": null,
            "concreteType": "Room",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ]
          }
        ]
      }
    ]
  }
],
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "user",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "roomInvites",
      "storageKey": null,
      "args": null,
      "concreteType": "RoomInvites",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "accepted",
          "storageKey": null,
          "args": null,
          "concreteType": "InviteConnection",
          "plural": false,
          "selections": (v6/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pending",
          "storageKey": null,
          "args": null,
          "concreteType": "InviteConnection",
          "plural": false,
          "selections": (v6/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "rejected",
          "storageKey": null,
          "args": null,
          "concreteType": "InviteConnection",
          "plural": false,
          "selections": (v6/*: any*/)
        }
      ]
    }
  ]
},
v8 = [
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
            "selections": (v5/*: any*/)
          }
        ]
      },
      (v7/*: any*/)
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
            "args": (v8/*: any*/),
            "concreteType": "RoomConnection",
            "plural": false,
            "selections": (v5/*: any*/)
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "rooms",
            "args": (v8/*: any*/),
            "handle": "connection",
            "key": "Home_rooms",
            "filters": null
          },
          (v3/*: any*/)
        ]
      },
      (v7/*: any*/)
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "HomeQuery",
    "id": null,
    "text": "query HomeQuery {\n  home {\n    rooms(first: 2147483647) {\n      edges {\n        node {\n          creator {\n            givenName\n            picture\n          }\n          id\n          name\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n  user {\n    givenName\n    picture\n    roomInvites {\n      accepted {\n        edges {\n          node {\n            creator {\n              givenName\n              picture\n            }\n            room {\n              id\n              name\n            }\n          }\n        }\n      }\n      pending {\n        edges {\n          node {\n            creator {\n              givenName\n              picture\n            }\n            room {\n              id\n              name\n            }\n          }\n        }\n      }\n      rejected {\n        edges {\n          node {\n            creator {\n              givenName\n              picture\n            }\n            room {\n              id\n              name\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
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
(node/*: any*/).hash = 'a231ab24ff5854a643feb55581ad9cfa';

module.exports = node;

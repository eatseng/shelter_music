/**
 * @flow
 * @relayHash ce92e988945d6df2ee2311f90c359dca
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
    +videos: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +addedBy: {|
            +givenName: string,
            +picture: string,
          |},
          +description: ?string,
          +id: string,
          +publishedAt: ?string,
          +thumbnails: {|
            +default: ?{|
              +height: number,
              +width: number,
              +url: string,
            |}
          |},
          +title: string,
        |}
      |}>
    |},
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
    videos(first: 2147483647) {
      edges {
        node {
          addedBy {
            givenName
            picture
          }
          description
          id
          publishedAt
          thumbnails {
            default {
              height
              width
              url
            }
          }
          title
          __typename
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
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
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "creator",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": (v2/*: any*/)
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v6 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "VideoEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "Video",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "addedBy",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
            "plural": false,
            "selections": (v2/*: any*/)
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": null,
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "publishedAt",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "thumbnails",
            "storageKey": null,
            "args": null,
            "concreteType": "VideoThumbnails",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "default",
                "storageKey": null,
                "args": null,
                "concreteType": "VideoThumbnail",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "height",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "width",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "url",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "title",
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
v7 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "user",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": (v2/*: any*/)
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
    "name": "RoomQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "room",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Room",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": "videos",
            "name": "__Room_videos_connection",
            "storageKey": null,
            "args": null,
            "concreteType": "VideoConnection",
            "plural": false,
            "selections": (v6/*: any*/)
          }
        ]
      },
      (v7/*: any*/)
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RoomQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "room",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Room",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "videos",
            "storageKey": "videos(first:2147483647)",
            "args": (v8/*: any*/),
            "concreteType": "VideoConnection",
            "plural": false,
            "selections": (v6/*: any*/)
          },
          {
            "kind": "LinkedHandle",
            "alias": null,
            "name": "videos",
            "args": (v8/*: any*/),
            "handle": "connection",
            "key": "Room_videos",
            "filters": null
          }
        ]
      },
      (v7/*: any*/)
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RoomQuery",
    "id": null,
    "text": "query RoomQuery(\n  $id: String!\n) {\n  room(id: $id) {\n    creator {\n      givenName\n      picture\n    }\n    id\n    name\n    videos(first: 2147483647) {\n      edges {\n        node {\n          addedBy {\n            givenName\n            picture\n          }\n          description\n          id\n          publishedAt\n          thumbnails {\n            default {\n              height\n              width\n              url\n            }\n          }\n          title\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n  user {\n    givenName\n    picture\n  }\n}\n",
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "room",
            "videos"
          ]
        }
      ]
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '490828ecb7a6275037279b9b5c389b7c';

module.exports = node;

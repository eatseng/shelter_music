/**
 * @flow
 * @relayHash 78e2d4c5f1ec73a780fe6cdf72211cb6
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
      +id: string,
      +givenName: string,
      +picture: string,
    |},
    +id: ?string,
    +isVotingEnabled: ?boolean,
    +name: string,
    +onlineParticipants: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +givenName: string,
          +picture: string,
        |}
      |}>
    |},
    +videos: ?{|
      +edges: ?$ReadOnlyArray<?{|
        +node: ?{|
          +addedBy: {|
            +givenName: string,
            +picture: string,
          |},
          +description: ?string,
          +id: string,
          +playAt: ?number,
          +publishedAt: ?string,
          +thumbnails: {|
            +default: ?{|
              +height: number,
              +width: number,
              +url: string,
            |}
          |},
          +title: string,
          +videoID: string,
          +votes: ?{|
            +edges: ?$ReadOnlyArray<?{|
              +node: ?{|
                +id: string,
                +userID: string,
              |}
            |}>
          |},
        |}
      |}>
    |},
  |},
  +user: ?{|
    +givenName: string,
    +id: string,
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
      id
      givenName
      picture
    }
    id
    isVotingEnabled
    name
    onlineParticipants(first: 2147483647) {
      edges {
        node {
          givenName
          picture
        }
      }
    }
    videos(first: 2147483647) {
      edges {
        node {
          addedBy {
            givenName
            picture
          }
          description
          id
          playAt
          publishedAt
          thumbnails {
            default {
              height
              width
              url
            }
          }
          title
          videoID
          votes(first: 2147483647) {
            edges {
              node {
                id
                userID
                __typename
              }
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
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
    id
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
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "givenName",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "picture",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "creator",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v3/*: any*/),
    (v4/*: any*/)
  ]
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "isVotingEnabled",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2147483647
  }
],
v9 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v10 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "onlineParticipants",
  "storageKey": "onlineParticipants(first:2147483647)",
  "args": (v8/*: any*/),
  "concreteType": "UserConnection",
  "plural": false,
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "UserEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "User",
          "plural": false,
          "selections": (v9/*: any*/)
        }
      ]
    }
  ]
},
v11 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "addedBy",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": (v9/*: any*/)
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "playAt",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "publishedAt",
  "args": null,
  "storageKey": null
},
v15 = {
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
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "videoID",
  "args": null,
  "storageKey": null
},
v18 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v20 = {
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
},
v21 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "VideoVoteEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "VideoVote",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "userID",
            "args": null,
            "storageKey": null
          },
          (v18/*: any*/)
        ]
      },
      (v19/*: any*/)
    ]
  },
  (v20/*: any*/)
],
v22 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "user",
  "storageKey": null,
  "args": null,
  "concreteType": "User",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v2/*: any*/),
    (v4/*: any*/)
  ]
};
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
          (v5/*: any*/),
          (v2/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v10/*: any*/),
          {
            "kind": "LinkedField",
            "alias": "videos",
            "name": "__Room_videos_connection",
            "storageKey": null,
            "args": null,
            "concreteType": "VideoConnection",
            "plural": false,
            "selections": [
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
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v2/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": "votes",
                        "name": "__Room_video_votes_connection",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "VideoVoteConnection",
                        "plural": false,
                        "selections": (v21/*: any*/)
                      },
                      (v18/*: any*/)
                    ]
                  },
                  (v19/*: any*/)
                ]
              },
              (v20/*: any*/)
            ]
          }
        ]
      },
      (v22/*: any*/)
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
          (v5/*: any*/),
          (v2/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v10/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "videos",
            "storageKey": "videos(first:2147483647)",
            "args": (v8/*: any*/),
            "concreteType": "VideoConnection",
            "plural": false,
            "selections": [
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
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v2/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "votes",
                        "storageKey": "votes(first:2147483647)",
                        "args": (v8/*: any*/),
                        "concreteType": "VideoVoteConnection",
                        "plural": false,
                        "selections": (v21/*: any*/)
                      },
                      {
                        "kind": "LinkedHandle",
                        "alias": null,
                        "name": "votes",
                        "args": (v8/*: any*/),
                        "handle": "connection",
                        "key": "Room_video_votes",
                        "filters": null
                      },
                      (v18/*: any*/)
                    ]
                  },
                  (v19/*: any*/)
                ]
              },
              (v20/*: any*/)
            ]
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
      (v22/*: any*/)
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RoomQuery",
    "id": null,
    "text": "query RoomQuery(\n  $id: String!\n) {\n  room(id: $id) {\n    creator {\n      id\n      givenName\n      picture\n    }\n    id\n    isVotingEnabled\n    name\n    onlineParticipants(first: 2147483647) {\n      edges {\n        node {\n          givenName\n          picture\n        }\n      }\n    }\n    videos(first: 2147483647) {\n      edges {\n        node {\n          addedBy {\n            givenName\n            picture\n          }\n          description\n          id\n          playAt\n          publishedAt\n          thumbnails {\n            default {\n              height\n              width\n              url\n            }\n          }\n          title\n          videoID\n          votes(first: 2147483647) {\n            edges {\n              node {\n                id\n                userID\n                __typename\n              }\n              cursor\n            }\n            pageInfo {\n              endCursor\n              hasNextPage\n            }\n          }\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n  user {\n    givenName\n    id\n    picture\n  }\n}\n",
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": null
        },
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
(node/*: any*/).hash = '5055a12e89a40f3b3951fbbcb461e889';

module.exports = node;

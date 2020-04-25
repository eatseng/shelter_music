/**
 * @flow
 * @relayHash 0b156ccf085e311b7f169633dcceb72f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddRoomVideosInput = {|
  videos?: ?$ReadOnlyArray<VideoInput>,
  room?: ?RoomInput,
|};
export type VideoInput = {|
  description?: ?string,
  id?: ?string,
  isVideoPlaying?: ?boolean,
  isVoted?: ?boolean,
  publishedAt?: ?string,
  thumbnails: VideoThumbnailsInput,
  title: string,
  videoID: string,
|};
export type VideoThumbnailsInput = {|
  default?: ?VideoThumbnailInput,
  medium?: ?VideoThumbnailInput,
  high?: ?VideoThumbnailInput,
|};
export type VideoThumbnailInput = {|
  height: number,
  width: number,
  url: string,
|};
export type RoomInput = {|
  creator: UserInput,
  id: string,
  name: string,
|};
export type UserInput = {|
  givenName: string,
  id?: ?string,
  name?: ?string,
  picture: string,
|};
export type AddRoomVideosMutationVariables = {|
  input: AddRoomVideosInput
|};
export type AddRoomVideosMutationResponse = {|
  +add: ?{|
    +error: ?string,
    +videos: ?$ReadOnlyArray<{|
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
      +videoID: string,
      +votes: ?{|
        +edges: ?$ReadOnlyArray<?{|
          +node: ?{|
            +id: string,
            +userID: string,
          |}
        |}>
      |},
    |}>,
  |}
|};
export type AddRoomVideosMutation = {|
  variables: AddRoomVideosMutationVariables,
  response: AddRoomVideosMutationResponse,
|};
*/


/*
mutation AddRoomVideosMutation(
  $input: AddRoomVideosInput!
) {
  add: addRoomVideos(input: $input) {
    error
    videos {
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
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "AddRoomVideosInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "error",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "addedBy",
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
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "publishedAt",
  "args": null,
  "storageKey": null
},
v7 = {
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
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "videoID",
  "args": null,
  "storageKey": null
},
v10 = [
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
          (v5/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "userID",
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
v11 = [
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
    "name": "AddRoomVideosMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "add",
        "name": "addRoomVideos",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "AddRoomVideosMutationPayload",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "videos",
            "storageKey": null,
            "args": null,
            "concreteType": "Video",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "kind": "LinkedField",
                "alias": "votes",
                "name": "__Room_video_votes_connection",
                "storageKey": null,
                "args": null,
                "concreteType": "VideoVoteConnection",
                "plural": false,
                "selections": (v10/*: any*/)
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AddRoomVideosMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "add",
        "name": "addRoomVideos",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "AddRoomVideosMutationPayload",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "videos",
            "storageKey": null,
            "args": null,
            "concreteType": "Video",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "votes",
                "storageKey": "votes(first:2147483647)",
                "args": (v11/*: any*/),
                "concreteType": "VideoVoteConnection",
                "plural": false,
                "selections": (v10/*: any*/)
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "votes",
                "args": (v11/*: any*/),
                "handle": "connection",
                "key": "Room_video_votes",
                "filters": null
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "AddRoomVideosMutation",
    "id": null,
    "text": "mutation AddRoomVideosMutation(\n  $input: AddRoomVideosInput!\n) {\n  add: addRoomVideos(input: $input) {\n    error\n    videos {\n      addedBy {\n        givenName\n        picture\n      }\n      description\n      id\n      publishedAt\n      thumbnails {\n        default {\n          height\n          width\n          url\n        }\n      }\n      title\n      videoID\n      votes(first: 2147483647) {\n        edges {\n          node {\n            id\n            userID\n            __typename\n          }\n          cursor\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": null
        }
      ]
    }
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0e9d72a951a5936245ced012517afa1b';

module.exports = node;

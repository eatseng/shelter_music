/**
 * @flow
 * @relayHash 6cdd8d64cc4a14dec010cbe03312d6e7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddRoomVideoInput = {|
  videos?: ?$ReadOnlyArray<VideoInput>,
  room?: ?RoomInput,
|};
export type VideoInput = {|
  description?: ?string,
  id: string,
  publishedAt?: ?string,
  thumbnails: VideoThumbnailsInput,
  title: string,
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
export type AddRoomVideoMutationVariables = {|
  input: AddRoomVideoInput
|};
export type AddRoomVideoMutationResponse = {|
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
    |}>,
  |}
|};
export type AddRoomVideoMutation = {|
  variables: AddRoomVideoMutationVariables,
  response: AddRoomVideoMutationResponse,
|};
*/


/*
mutation AddRoomVideoMutation(
  $input: AddRoomVideoInput!
) {
  add: addRoomVideo(input: $input) {
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
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "AddRoomVideoInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "add",
    "name": "addRoomVideo",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddRoomVideoMutationPayload",
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
        "name": "videos",
        "storageKey": null,
        "args": null,
        "concreteType": "Video",
        "plural": true,
        "selections": [
          {
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
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "description",
            "args": null,
            "storageKey": null
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
    "name": "AddRoomVideoMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AddRoomVideoMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "AddRoomVideoMutation",
    "id": null,
    "text": "mutation AddRoomVideoMutation(\n  $input: AddRoomVideoInput!\n) {\n  add: addRoomVideo(input: $input) {\n    error\n    videos {\n      addedBy {\n        givenName\n        picture\n      }\n      description\n      id\n      publishedAt\n      thumbnails {\n        default {\n          height\n          width\n          url\n        }\n      }\n      title\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9b6ac0b9db8083d44f3647cb48d5f9e5';

module.exports = node;

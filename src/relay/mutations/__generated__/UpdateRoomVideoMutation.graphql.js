/**
 * @flow
 * @relayHash 18e6f451b46447c440ae7bce97b726e7
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type UpdateRoomVideoInput = {|
  video: VideoInput,
  vote?: ?VoteInput,
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
export type VoteInput = {|
  id?: ?string,
  userID?: ?string,
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
export type UpdateRoomVideoMutationVariables = {|
  input: UpdateRoomVideoInput
|};
export type UpdateRoomVideoMutationResponse = {|
  +update: ?{|
    +error: ?string,
    +vote: ?{|
      +id: string,
      +userID: string,
    |},
  |}
|};
export type UpdateRoomVideoMutation = {|
  variables: UpdateRoomVideoMutationVariables,
  response: UpdateRoomVideoMutationResponse,
|};
*/


/*
mutation UpdateRoomVideoMutation(
  $input: UpdateRoomVideoInput!
) {
  update: updateRoomVideo(input: $input) {
    error
    vote {
      id
      userID
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "UpdateRoomVideoInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": "update",
    "name": "updateRoomVideo",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateRoomVideoMutationPayload",
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
        "name": "vote",
        "storageKey": null,
        "args": null,
        "concreteType": "VideoVote",
        "plural": false,
        "selections": [
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
            "name": "userID",
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
    "name": "UpdateRoomVideoMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "UpdateRoomVideoMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "UpdateRoomVideoMutation",
    "id": null,
    "text": "mutation UpdateRoomVideoMutation(\n  $input: UpdateRoomVideoInput!\n) {\n  update: updateRoomVideo(input: $input) {\n    error\n    vote {\n      id\n      userID\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b27e8f8d1ab2377d5c784dc2250d8267';

module.exports = node;

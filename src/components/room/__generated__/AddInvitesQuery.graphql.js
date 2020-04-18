/**
 * @flow
 * @relayHash b5a97c12bbab05485da5e49fa156bc5a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddInvitesQueryVariables = {||};
export type AddInvitesQueryResponse = {|
  +users: ?$ReadOnlyArray<{|
    +givenName: string,
    +id: string,
    +name: string,
    +picture: string,
  |}>
|};
export type AddInvitesQuery = {|
  variables: AddInvitesQueryVariables,
  response: AddInvitesQueryResponse,
|};
*/


/*
query AddInvitesQuery {
  users {
    givenName
    id
    name
    picture
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "users",
    "storageKey": null,
    "args": null,
    "concreteType": "User",
    "plural": true,
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
      },
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "picture",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "AddInvitesQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "AddInvitesQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "AddInvitesQuery",
    "id": null,
    "text": "query AddInvitesQuery {\n  users {\n    givenName\n    id\n    name\n    picture\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9f1a70a12c40545bc3eb1865b04326d7';

module.exports = node;

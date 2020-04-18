const {buildSchema} = require("graphql");

module.exports = buildSchema(`
  input CreateInviteInput {
    invitees: [UserInput!]
    room: RoomInput!
  }

  input RoomInput {
    creator: UserInput!
    id: String!
    name: String!
  }

  input UserInput {
    givenName: String!
    id: String
    name: String
    picture: String!
  }

  input UpsertRoomInput {
    name: String!
  }

  type InviteMutationResponse {
    error: String
  }

  type Room {
    creator: User
    id: String
    name: String!
  }

  type RoomMutationResponse {
    error: String
    room: Room
  }

  type User {
    givenName: String!
    id: String!
    name: String!
    picture: String!
  }

  type Mutation {
    createInvite(input: CreateInviteInput!): InviteMutationResponse
    upsertRoom(input: UpsertRoomInput!): RoomMutationResponse
  }

  type Query {
    room(id: String!): Room
    rooms: [Room!]
    user: User
    users: [User!]
  }
`);
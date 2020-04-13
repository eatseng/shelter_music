const {buildSchema} = require("graphql");

module.exports = buildSchema(`
  input UpsertRoomInput {
    name: String!
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
    picture: String!
  }

  type Mutation {
  	upsertRoom(input: UpsertRoomInput!): RoomMutationResponse
  }

  type Query {
    rooms: [Room!]
    user: User
  }
`);
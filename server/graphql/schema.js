const {buildSchema} = require("graphql");

module.exports = buildSchema(`
  input UpsertRoomInput {
    name: String!
  }

  type Room {
    name: String!
  }

  type User {
    givenName: String!
    picture: String!
  }

  type Mutation {
  	upsertRoom(input: UpsertRoomInput!): Room
  }

  type Query {
    user: User
  }
`);
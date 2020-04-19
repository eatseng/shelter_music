const {buildSchema} = require("graphql");

module.exports = buildSchema(`
  input AddRoomVideoInput {
    videos: [VideoInput!]
    room: RoomInput
  }

  input CreateInviteInput {
    invitees: [UserInput!]
    room: RoomInput!
  }

  input RoomInput {
    creator: UserInput!
    id: String!
    name: String!
  }

  input VideoThumbnailInput {
    height: Int!
    width: Int!
    url: String!
  }

  input VideoThumbnailsInput {
    default: VideoThumbnailInput
    medium: VideoThumbnailInput
    high: VideoThumbnailInput
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

  input VideoInput {
    description: String
    id: String!
    publishedAt: String
    thumbnails: VideoThumbnailsInput!
    title: String!
  }

  interface Node {
    id: ID!
  }

  type AddRoomVideoMutationPayload {
    error: String
    videos: [Video!]
  }

  type Home implements Node {
    id: ID!
    rooms(after: String, first: Int, before: String, last: Int): RoomConnection
  }

  type InviteMutationPayload {
    error: String
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Room {
    creator: User
    id: String
    name: String!
    videos(after: String, first: Int, before: String, last: Int): VideoConnection
  }

  type RoomConnection {
    edges: [RoomEdge]
    pageInfo: PageInfo
  }

  type RoomEdge {
    cursor: String!
    node: Room
  }

  type RoomMutationPayload {
    error: String
    room: Room
  }

  type User {
    givenName: String!
    id: String!
    name: String!
    picture: String!
  }

  type Video {
    addedBy: User!
    description: String
    id: String!
    publishedAt: String
    thumbnails: VideoThumbnails!
    title: String!
  }

  type VideoConnection {
    edges: [VideoEdge]
    pageInfo: PageInfo
  }

  type VideoEdge {
    cursor: String!
    node: Video
  }

  type VideoThumbnail {
    height: Int!
    width: Int!
    url: String!
  }

  type VideoThumbnails {
    default: VideoThumbnail
    medium: VideoThumbnail
    high: VideoThumbnail
  }

  type Mutation {
    addRoomVideo(input: AddRoomVideoInput!): AddRoomVideoMutationPayload
    createInvite(input: CreateInviteInput!): InviteMutationPayload
    upsertRoom(input: UpsertRoomInput!): RoomMutationPayload
  }

  type Query {
    home: Home
    room(id: String!): Room
    user: User
    users: [User!]
  }
`);
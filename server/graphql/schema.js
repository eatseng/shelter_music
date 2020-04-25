const {buildSchema} = require("graphql");

module.exports = buildSchema(`
  input AddRoomVideosInput {
    videos: [VideoInput!]
    room: RoomInput
  }

  input CreateInviteInput {
    invitees: [UserInput!]
    room: RoomInput!
  }

  input CreateRoomInput {
    name: String!
  }

  input EnableVotingInput {
    roomID: String!
    isEnableVoting: Boolean!
  }

  input LeaveRoomInput {
    roomID: String!
  }

  input RoomInput {
    creator: UserInput!
    id: String!
    name: String!
  }

  input UpdateRoomVideoInput {
    video: VideoInput!
    vote: VoteInput
    room: RoomInput
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

  input VoteInput {
    id: String
    userID: String
  }

  input UserInput {
    givenName: String!
    id: String
    name: String
    picture: String!
  }

  input VideoInput {
    description: String
    id: String
    isVideoPlaying: Boolean
    isVoted: Boolean
    publishedAt: String
    thumbnails: VideoThumbnailsInput!
    title: String!
    videoID: String!
  }

  interface Node {
    id: ID!
  }

  type AddRoomVideosMutationPayload {
    error: String
    videos: [Video!]
  }

  type EnableVotingMutationPayload {
    error: String
    id: String
    isVotingEnabled: Boolean
  }

  type Home implements Node {
    id: ID!
    rooms(after: String, first: Int, before: String, last: Int): RoomConnection
  }

  type InviteMutationPayload {
    error: String
  }

  type LeaveRoomMutationPayload {
    isLeft: Boolean
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
    isVotingEnabled: Boolean
    name: String!
    onlineParticipants
      (after: String, first: Int, before: String, last: Int): UserConnection
    videos
      (after: String, first: Int, before: String, last: Int): VideoConnection
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

  type UpdateRoomVideoMutationPayload {
    error: String
    video: Video
    vote: VideoVote
  }

  type User {
    givenName: String!
    id: String!
    name: String!
    onlineTimestamp: Int
    picture: String!
  }

  type UserConnection {
    edges: [UserEdge]
    pageInfo: PageInfo
  }

  type UserEdge {
    cursor: String!
    node: User
  }

  type Video {
    addedBy: User!
    description: String
    id: String!
    playAt: Int
    publishedAt: String
    thumbnails: VideoThumbnails!
    title: String!
    videoID: String!
    votes(after: String, first: Int, before: String, last: Int):
      VideoVoteConnection
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

  type VideoVote {
    id: String!
    userID: String!
  }

  type VideoVoteConnection {
    edges: [VideoVoteEdge]
    pageInfo: PageInfo
  }

  type VideoVoteEdge {
    cursor: String!
    node: VideoVote
  }

  type Mutation {
    addRoomVideos(input: AddRoomVideosInput!): AddRoomVideosMutationPayload
    createInvite(input: CreateInviteInput!): InviteMutationPayload
    createRoom(input: CreateRoomInput!): RoomMutationPayload
    enableVoting(input: EnableVotingInput): EnableVotingMutationPayload
    leaveRoom(input: LeaveRoomInput): LeaveRoomMutationPayload
    updateRoomVideo(input: UpdateRoomVideoInput!): UpdateRoomVideoMutationPayload
  }

  type Query {
    home: Home
    room(id: String!): Room
    user: User
    users: [User!]
  }
`);
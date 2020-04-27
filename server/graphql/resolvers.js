const InviteModel = require('../models/invite');
const RoomModel = require('../models/room');
const UserModel = require('../models/user');

const userSnakeToCamelCase = require('../utils/userSnakeToCamelCase');

module.exports = (res) => {
  return {
    addRoomVideos: async ({input}) => {

      let error;

      try {

        const Room = new RoomModel();
        const videos = await Room.addVideos(
          input.room,
          userSnakeToCamelCase(res.locals.user),
          input.videos,
        );
        Room.disconnect();

        return {error, videos};

      } catch (e) {
        
        error = e.message;

      }

      return {error};

    },

    createInvite: async ({input}) => {

      let error;

      try {
        
        const Invite = new InviteModel();
        const invites = await Invite.createMany(
          userSnakeToCamelCase(res.locals.user),
          input.invitees,
          input.room,
        );
        Invite.disconnect()

        const User = new UserModel();
        await Promise.all(invites.map(invite => User.upsertInvite(invite)));
        User.disconnect();

      } catch (e) {
        
        error = e.message;

      }
      
      return {error};

    },

    createRoom: async ({input}) => {

      let error = null;
      
      try {

        const Room = new RoomModel();
        const {ops: [room]} =
          await Room.create({name: input.name}, res.locals.user);
        Room.disconnect();
        
        return {error, room};

      } catch (e) {
        
        error = e.message;
      
      }

      return {error};

    },

    enableVoting: async ({input}) => {

      let error = null;
      
      try {

        const Room = new RoomModel();
        const isVotingEnabled =
          await Room.enableVoting(input.roomID, input.isEnableVoting);
        Room.disconnect();
        
        return {error, isVotingEnabled};

      } catch (e) {
        
        error = e.message;
      
      }

      return {error};
    
    },

    home: async () => {

      const Room = new RoomModel();
      const rooms = await Room.getAll(res.locals.user);
      Room.disconnect();
      
      return {
        id: 'home_001',
        rooms: {
          edges: rooms.map(room => {
            return {cursor: room.id, node: room};
          }),
        },
      };

    },

    leaveRoom: async ({input}) => {

      let error;

      try {

        const Room = new RoomModel();
        const isLeft = await Room.leaveRoom(
          input.roomID,
          userSnakeToCamelCase(res.locals.user),
        );
        Room.disconnect();

        return isLeft;

      } catch (e) {

        error = e.message;

      }

      return false;

    },

    room: async ({id}) => {

      const Room = new RoomModel();
      const [room] = await Room.get(id, userSnakeToCamelCase(res.locals.user));
      Room.disconnect();

      return {
        ...room,
        onlineParticipants: {
          edges: (room.onlineParticipants || [])
            .filter(person => person.id != res.locals.user.id)
            .map(person => {return {cursor: person.id, node: person}}),
        },
        videos: {
          edges: room.videos
            .map(video => {
              return {
                cursor: video.id,
                node: {
                  ...video,
                  votes: {
                    edges: (video.votes || []).map(vote => {
                      return {cursor: vote.id, node: vote};
                    }),
                  },
                },
              };
            }
          ),
        },
      };
    },

    updateRoomVideo: async ({input}) => {

      let error;

      try {

        const Room = new RoomModel();
        const vote = await Room.updateVideo(
          input.room,
          userSnakeToCamelCase(res.locals.user),
          input.video,
        );
        Room.disconnect();

        return {error, vote};

      } catch (e) {

        error = e.message;

      }

      return {error};

    },

    user: async () => {

      const User = new UserModel();
      const [user] = await User.getMongo({id: res.locals.user.id});
      User.disconnect();

      return {
        ...user,
        roomInvites: {
          ...['accepted', 'pending', 'rejected'].reduce((acc, key) => {
            return {
              ...acc,
              [key]: {
                edges: [
                  ...(user.roomInvites[key] || [])
                    .filter(invite => invite.recipient.id === user.id)
                    .map(node => {
                      return {
                        cursor: node.id,
                        node,
                      };
                    }
                  ),
                ],
              },
            };
          }, {}),
        }
      };

    },

    users: async () => {

      const User = new UserModel();
      const results = await User.getAll();
      User.disconnect();
      
      return results;

    },
  };
};
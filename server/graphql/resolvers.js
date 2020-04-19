const InviteModel = require('../models/invite');
const RoomModel = require('../models/room');
const UserModel = require('../models/user');

const userSnakeToCamelCase = require('../utils/userSnakeToCamelCase');

module.exports = (res) => {
  return {
    addRoomVideo: async ({input}) => {

      let error;

      try {

        const Room = new RoomModel();
        const videos = await Room.addVideo(
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

    home: async () => {

      const Room = new RoomModel();
      const rooms = await Room.getAll(res.locals.user);
      Room.disconnect();
      
      return {
        id: 'home_001',
        rooms: {
          edges: rooms.map(room => { return {cursor: room.id, node: room}}),
        },
      };

    },

    room: async ({id}) => {

      const Room = new RoomModel();
      const [room] = await Room.get(id);
      Room.disconnect();

      return {
        ...room,
        videos: {
          edges: room.videos
            .map(video => { return {cursor: video.id, node: video}}),
        },
      };

    },

    upsertRoom: async ({input}) => {

      let error = null;
      
      try {

        const Room = new RoomModel();
        const {ops: [room]} = await Room.create({name: input.name}, res.locals.user);
        Room.disconnect();
        
        return {error, room};

      } catch (e) {
        
        error = e.message;
      
      }

      return {
        error,
        room: {name: input.name},
      };

    },

    user: async () => {

      return {
        givenName: res.locals.user.given_name,
        picture: res.locals.user.picture,
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
const InviteModel = require('../models/invite');
const RoomModel = require('../models/room');
const UserModel = require('../models/user');

const userSnakeToCamelCase = require('../utils/userSnakeToCamelCase');

module.exports = (res) => {
  return {
    createInvite: async ({input}) => {

      let error = null;

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

    room: async ({id}) => {

      const Room = new RoomModel();
      const [result] = await Room.get(id);
      Room.disconnect();

      return result;

    },

    rooms: async () => {

      const Room = new RoomModel();
      const results = await Room.getAll(res.locals.user);
      Room.disconnect();

      return results;

    },

    upsertRoom: async ({input}) => {

      let error = null;
      
      try {

        const Room = new RoomModel();
        const result = await Room.create({name: input.name}, res.locals.user);
        Room.disconnect();

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
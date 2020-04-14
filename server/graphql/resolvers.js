const RoomModel = require('../models/room')


module.exports = (res) => {
  return {
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
        
        error = e.message
      
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
  };
};
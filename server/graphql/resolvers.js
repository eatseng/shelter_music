const RoomModel = require('../models/room')


module.exports = (res) => {
	return {
    rooms: async () => {

      const Room = new RoomModel();
      const result = await Room.get(res.locals.user);
      Room.disconnect();

      return result;

    },

    upsertRoom: async ({input}) => {

      let error = null;
      
      try {
        const Room = new RoomModel();
        const result = await Room.create({name: input.name}, res.locals.user);
        Room.disconnect();
        console.log(result)
        console.log(result.toJSON())
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
const UserModel = require('../models/user')

module.exports = (res) => {
	return {
    upsertRoom: async ({input}) => {
      return {
        name: input.name
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
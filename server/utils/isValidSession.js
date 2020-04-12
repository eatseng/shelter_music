const UserModel = require('../models/user');

const isValidSession = module.exports = () =>
  async (req, res, next) => { 

    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.session.userID == null) {
      res.writeHead(401, {'Content-Type': 'text/plain'});
      res.send();
      return;
    }
    
    try {

      const User = new UserModel();
      const user = await User.get(req.session.userID);
      User.disconnect();  

      if (user.id !== req.session.userID) {
        req.session.destroy((error) => {
          if (error != null) {
            throw 'Error erasing session!'
          }
        });
        res.writeHead(401, {'Content-Type': 'text/plain'});
        res.send();
      } else {
        res.locals.user = user;
        next();
      }

    } catch (error) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.send();
    }
  };


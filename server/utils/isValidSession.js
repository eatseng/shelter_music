const UserModel = require('../models/User');

const dotenv = require('dotenv');

dotenv.config();

const isValidSession = module.exports = () =>
  async (req, res, next) => { 

    res.setHeader('Access-Control-Allow-Credentials', true);
    
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
        next();
      }

    } catch (error) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.send();
    }
  };


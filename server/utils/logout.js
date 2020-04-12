const UserModel = require('../models/user');

const logout = module.exports = () =>
  async (req, res, next) => { 

    res.setHeader('Access-Control-Allow-Credentials', true);
    
    try {
      
      const User = new UserModel();
      await User.logout(req.session.userID);
      User.disconnect();  

      req.session.destroy((error) => {
        if (error != null) {
          throw 'Error erasing session!'
        }
      });

      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.send();

    } catch (error) {
      res.writeHead(401, {'Content-Type': 'text/plain'});
      res.send();
    }
  };


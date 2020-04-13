const {OAuth2Client} = require('google-auth-library');
const UserModel = require('../models/user');

const dotenv = require('dotenv');
const uuidv4 = require('uuid/v4');

dotenv.config();

const verifyGoogleToken = module.exports = () =>
  (req, res, next) => { 

    res.setHeader('Access-Control-Allow-Credentials', true);

    const client =
      new OAuth2Client(process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID);
    
    const verify = async () => {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: [process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID],
      });
      const payload = ticket.getPayload();
      
      if (
        payload['aud'] !== process.env.REACT_APP_GOOGLE_SIGN_IN_CLIENT_ID ||
        payload['iss'] !== 'accounts.google.com'
      ) {
        throw "ID token verification with Google failed!";
      }
      
      return payload;
    }

    verify()
      .then(async (payload) => {
        const user = {
          email: payload['email'],
          email_verified: payload['email_verified'],
          family_name: payload['family_name'],
          given_name: payload['given_name'],
          id: payload['sub'],
          locale: payload['locale'],
          name: payload['name'],
          password: uuidv4(),
          picture: payload['picture'],
        };

        try {

          const User = new UserModel();
          const isSuccess = await User.upsert(user)
          const isSuccessMongo = await User.upsertMongo(user)
          User.disconnect();

          req.session.userID = user.id;
          req.session.password = user.password;

          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.send();

        } catch (error) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.send();
        }
      })
      .catch(() => {
        res.writeHead(401, {'Content-Type': 'text/plain'});
        res.send();
      });
  };


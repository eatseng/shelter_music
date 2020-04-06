const apiRequest = require("../utils/apiCall");
const dotenv = require('dotenv');
const mysql = require('mysql');
const options = require('../utils/options')

dotenv.config();

function User(params) {
  if (params != undefined) {
    null;
  }

  this.connection = mysql.createConnection({
    ...options.mysqlSession,
    connectionLimit: 10,
  });

  this.connection.connect();
};

User.prototype.disconnect = function (user, mysqlCb) {

  this.connection.end()

}

User.prototype.get = function (userID) {

  if (userID == null) {
    throw 'userID is null!';
  }

  return new Promise((resolve, reject) => {
    this.connection.query(`
      SELECT * FROM users WHERE id = ?
      `,
      userID,
      (error, results, fields) => {
        if (error != null) {
          reject(error);
        } else {
          const [user] = results
          resolve(Object.assign({}, user));
        }
      },
    );
  });

}

User.prototype.upsert = function (user) {

  if (user == null) {
    throw 'user object is null!';
  } 

  return new Promise((resolve, reject) => {
    this.connection.query(`
      INSERT INTO users
      SET ?
      ON DUPLICATE KEY UPDATE 
        email = VALUES(email),
        email_verified = VALUES(email_verified),
        family_name = VALUES(family_name),
        given_name = VALUES(given_name),
        locale = VALUES(locale),
        name = VALUES(name),
        password = VALUES(password),
        picture = VALUES(picture);`,
      user,
      (error, results, fields) => {
        if (error != null) {
          reject(error);
        } else {
          resolve(true);
        }
      },
    );
  });

};

module.exports = User;
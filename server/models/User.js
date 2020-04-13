const apiRequest = require("../utils/apiCall");
const dotenv = require('dotenv');
const mongodb = require('mongodb');
const mysql = require('mysql');
const options = require('../utils/options')

dotenv.config();

function User(params) {
  if (params != undefined) {
    null;
  }

  this.mongo = new mongodb.MongoClient(
    options.mongoSession.url,
    options.mongoSession.options,
  );
  this.mysql = mysql.createConnection({
    ...options.mysqlSession,
    connectionLimit: 10,
  });

  this.mysql.connect();
};

User.prototype.disconnect = function () {

  this.mongo.close();
  this.mysql.end();

}

User.prototype.get = function (userID) {

  if (userID == null) {
    throw 'userID is null!';
  }

  return new Promise((resolve, reject) => {
    this.mysql.query(`
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

User.prototype.logout = function (userID) {

  if (userID == null) {
    throw 'userID is null!';
  }

  return new Promise((resolve, reject) => {
    this.mysql.query(`
      UPDATE users SET password = '' WHERE id = ?
      `,
      userID,
      (error, results, fields) => {
        if (error != null) {
          reject(error);
        } else {
          resolve();
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
    this.mysql.query(`
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
}

User.prototype.upsertMongo = async function (user) {

  await this.mongo.connect();

  const db = this.mongo.db(options.mongoSession.database);
  const c = db.collection('participants');

  const participant = {
    email: user.email,
    familyName: user.family_name,
    givenName: user.given_name,
    isDeleted: false,
    name: user.name,
    picture: user.picture,
  };

  return c.updateOne(
    {id: user.id},
    {
      $set: participant,
      $setOnInsert: {
        invites: [],
        rooms: [],
      }
    },
    {upsert: true},
  );
};

module.exports = User;
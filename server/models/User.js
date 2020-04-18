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

User.prototype.upsertInvite = async function (invite) {

  if (invite.creator.id === invite.recipient.id) {
    throw {message: 'Cannot send invite to participant her/himself!'};
  }

  await this.mongo.connect();

  const db = this.mongo.db(options.mongoSession.database);
  const c = db.collection('participants');

  let newInvite = null;
  if (invite.status === 'Accepted') {
    newInvite = {'roomInvites.accepted' : {$each: [invite]}};
  } else if (invite.status === 'Rejected') {
    newInvite = {'roomInvites.rejected' : {$each: [invite]}};
  } else {
    newInvite = {'roomInvites.pending' : {$each: [invite]}};
  }

  newInvite = {'roomInvites.rejected' : {$each: [invite]}};

  const previousInvite = ['accepted', 'pending','rejected']
    .reduce((acc, key) => {
      return {
        ...acc,
        [`roomInvites.${key}`]: {
          'creator.id': invite.creator.id,
          'recipient.id': invite.recipient.id,
          'room.id': invite.room.id,
        },
      };
    }, {});

  const writeQuery = [invite.creator.id, invite.recipient.id]
    .reduce((acc, id) => [...acc, ...[{
      updateOne: {
        filter: {id},
        update: {$pull: previousInvite},
      },
    },
    {
      updateOne: {
        filter: {id},
        update: {$push: newInvite},
      },
    },]], []);
  
  return new Promise((resolve, reject) => {
    c.bulkWrite(writeQuery, {ordered: true, w: 1}, (err, r) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(r.result.ok === 1);
      }
    });
  });

};

User.prototype.disconnect = function () {

  this.mongo.close();
  this.mysql.end();

}

User.prototype.get = function (userID) {

  if (userID == null) {
    throw {message: 'userID is null!'};
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

User.prototype.getAll = async function () {

  await this.mongo.connect();

  const db = this.mongo.db(options.mongoSession.database);
  const c = db.collection('participants');

  return new Promise((resolve, reject) => {
    c.find().toArray((err, docs) => {
      if (err != null) {
        reject(err);
      }
      resolve(docs);
    });
  });

}

User.prototype.logout = function (userID) {

  if (userID == null) {
    throw {message: 'userID is null!'};
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
        roomInvites: {accepted: [], pending: [], rejected: []},
        rooms: [],
      }
    },
    {upsert: true},
  );
};

module.exports = User;
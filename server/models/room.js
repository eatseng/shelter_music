const apiRequest = require("../utils/apiCall");
const dotenv = require('dotenv');
const mongodb = require('mongodb');
const options = require('../utils/options')
const uuidv4 = require('uuid/v4');

dotenv.config();

function Room(params) {
  if (params != undefined) {
    null;
  }

  this.mongo = new mongodb.MongoClient(
    options.mongoSession.url,
    options.mongoSession.options,
  );

};

Room.prototype.addVideo = async function (room, user, videos) {
  if (videos.length === 0) {
    throw {message: 'Video list is empty!'};
  }

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('rooms');

  const writeQuery = videos.map(video => {
    return {
      updateOne: {
        filter: {id: room.id},
        update: {$push: {videos: {...video, addedBy: user}}},
      },
    };
  });

  return new Promise((resolve, reject) => {
    c.bulkWrite(writeQuery, {ordered: true, w: 0}, (err, r) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(videos.map(video => {return {...video, addedBy: user}}));
      }
    });
  });
}


Room.prototype.disconnect = function () {

  this.mongo.close();

}

Room.prototype.get = async function (roomID) {

  if (roomID== null) {
    throw {message: 'roomID is null!'};
  }

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('rooms');

  return new Promise((resolve, reject) => {
    c.find({'id': roomID}).toArray((err, docs) => {
      if (err != null) {
        reject(err);
      }
      resolve(docs);
    });
  });
}

Room.prototype.getAll = async function (user) {

  if (user.id == null) {
    throw {message: 'userID is null!'};
  }

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('rooms');

  return new Promise((resolve, reject) => {
    c.find({'creator.id': user.id}).toArray((err, docs) => {
      if (err != null) {
        reject(err);
      }
      resolve(docs);
    });
  });
}

Room.prototype.create = async function (room, user) {

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('rooms');

  const participant = {
    id: user.id,
    email: user.email,
    familyName: user.family_name,
    givenName: user.given_name,
    name: user.name,
    picture: user.picture,
  };

  return c.insertOne({
    creator: participant,
    id: uuidv4(),
    invites: [],
    isDeleted: false,
    name: room.name,
    onlineParticipants: [],
    videos: [],
  });
};

module.exports = Room;
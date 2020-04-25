const apiRequest = require("../utils/apiCall");
const dotenv = require('dotenv');
const mongodb = require('mongodb');
const options = require('../utils/options')
const uuidv4 = require('uuid/v4');

const updateClients = require('../utils/updateClients');

dotenv.config();

const MAX_GRAPHQL_INT = 2147483647;

function Room(params) {
  if (params != undefined) {
    null;
  }

  this.mongo = new mongodb.MongoClient(
    options.mongoSession.url,
    options.mongoSession.options,
  );

};

Room.prototype.addVideos = async function (room, user, videos) {
  if (videos.length === 0) {
    throw {message: 'Video list is empty!'};
  }

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('rooms');

  const addedBy = user;
  const id = uuidv4();
  const playAt = MAX_GRAPHQL_INT;
  const totalVotes = 0;

  const writeQuery = videos.map(video => {
    return {
      updateOne: {
        filter: {id: room.id},
        update: {
          $push: {
            videos: {...video, addedBy, id, playAt, totalVotes, votes: []},
          },
        },
      },
    };
  });

  return new Promise((resolve, reject) => {
    c.bulkWrite(writeQuery, {ordered: true, w: 0}, (err, r) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(videos.map(video => {
          return {
            ...video,
            addedBy: user,
            id,
            votes: {edges: null, pageInfo: null},
          };
        }));
      }
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
    isVotingEnabled: true,
    name: room.name,
    onlineParticipants: [],
    videos: [],
  });
};

Room.prototype.disconnect = function () {

  this.mongo.close();

}

Room.prototype.enableVoting = async function (roomID, isEnableVoting) {

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('rooms');

  return new Promise((resolve, reject) => {
    c.updateOne(
      {id: roomID},
      {$set: {isVotingEnabled: isEnableVoting}},
      (err, r) => {
        if (err != null) {
          reject(err);
        } else {
          updateClients(roomID)
          resolve(isEnableVoting);
        }
      },
    );
  });
}

Room.prototype.get = async function (roomID, user) {

  if (roomID== null) {
    throw {message: 'roomID is null!'};
  }

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('rooms');

  const writeQuery = [{
    updateOne: {
      filter: {id: roomID},
      update: {$pull: {onlineParticipants: {id: user.id}}},
    },
  },
  {
    updateOne: {
      filter: {id: roomID},
      update: {
        $push: {
          onlineParticipants: {
            ...user,
            onlineTimestamp: Math.floor(Date.now() / 1000),
          },
        },
      },
    },
  },
  {
    updateOne: {
      filter: {id: roomID},
      update: {
        $pull: {
          onlineParticipants: {
            onlineTimestamp: {$lt: Math.floor(Date.now() / 1000) - 15},
          },
        },
      },
    },
  },
  {
    updateOne: {
      filter: {
        id: roomID,
        isVotingEnabled: true,
        "videos.playAt": {$lt: MAX_GRAPHQL_INT}, 
        "videos.totalVotes": 0,
      },
      update: {
        $pull: {
          videos: {
            playAt: {$lt: Math.floor(Date.now() / 1000) - 30},
          },
        },
      },
    },
  }];

  await new Promise((resolve, reject) => {
    c.bulkWrite(writeQuery, {ordered: true, w: 1}, (err, r) => {
      if (err != null) {
        reject(err);
      } else {
        if (r.modifiedCount !== 2) {
          updateClients(roomID)
        }
        resolve(r.result.ok === 1);
      }
    });
  });

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

Room.prototype.leaveRoom = async function (roomID, user) {

  if (roomID == null) {
    throw {message: 'roomID is null!'};
  }

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('rooms');

  return new Promise((resolve, reject) => {
    c.updateOne(
      {id: roomID},
      {$pull: {onlineParticipants: {id: user.id}}},
      (err, r) => {
        if (err != null) {
          reject(err);
        } else {
          updateClients(roomID);
          resolve(true);
        }
      },
    );
  });
}

Room.prototype.updateVideo = async function (room, user, video) {
  
  if (video.id == null) {
    throw {message: 'Video is missing its id!'};
  }

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('rooms');

  const newVote = {id: uuidv4(), userID: user.id};

  const callback = (resolve, reject, tag) => (err, r) => {
    if (err != null) {
      reject(err);
    } else {
      tag != null && updateClients(room.id, tag);
      resolve(newVote);
    }
  };

  if (video.isVideoPlaying === true) {
    return new Promise((resolve, reject) => {
      c.updateOne(
        {
          id: room.id,
          videos: {
            $elemMatch: {
              id: video.id,
              playAt: {$gt: Math.floor(Date.now() / 1000)},
            },
          },
        },
        {$set: {"videos.$.playAt": Math.floor(Date.now() / 1000)}},
        callback(resolve, reject, 'firstPlay'),
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      c.updateOne(
        {id: room.id, "videos.id": video.id},
        video.isVoted === true
          ? {
              $inc: {"videos.$.totalVotes": 1},
              $push: {"videos.$.votes": {...newVote}},
            }
          : {
              $inc: {"videos.$.totalVotes": -1},
              $pull: {"videos.$.votes": {userID: user.id}},
            },
        callback(resolve, reject, 'vote'),
      );
    });
  }
  
}

module.exports = Room;
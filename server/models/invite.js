const apiRequest = require("../utils/apiCall");
const dotenv = require('dotenv');
const mongodb = require('mongodb');
const options = require('../utils/options')

dotenv.config();

function Invite(params) {
  if (params != undefined) {
    null;
  }

  this.mongo = new mongodb.MongoClient(
    options.mongoSession.url,
    options.mongoSession.options,
  );

};

Invite.prototype.disconnect = function () {

  this.mongo.close();

}

Invite.prototype.createMany = async function (creator, invitees, room) {

  return this.upsertMany(
    creator,
    invitees,
    'Pending', /* invite status */
    room
  );

}

Invite.prototype.upsertMany = async function (creator, invitees, status, room) {

  await this.mongo.connect();

  const c = this.mongo.db(options.mongoSession.database).collection('invites')

  const invites = invitees.map(invitee => {
    return {
      payload: {
        creator,
        status,
        recipient: invitee,
        room, 
      },
      query: {
        updateOne: {
          filter: {
            'creator.id': creator.id,
            'recipient.id': invitee.id,
            'room.id': room.id,
          },
          update: {
            $set: {status},
            $setOnInsert: {
              creator,
              recipient: invitee,
              room, 
            },
          },
          upsert: true,
        },
      },
    }
  });

  const writeQuery = invites.map(invite => invite.query);

  return new Promise((resolve, reject) => {
    c.bulkWrite(writeQuery, {ordered: true, w: 0}, (err, r) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(invites.map(invite => invite.payload));
      }
    });
  });
};

module.exports = Invite;
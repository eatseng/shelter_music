const dotenv = require('dotenv');
const session = require('express-session');
const uuidv4 = require('uuid/v4');

dotenv.config();

module.exports = {
  expressSession: {
    cookie: {
      expires: 30 * 24 * 60 * 60 * 1000,
    },
    genid: (req) => {
      return uuidv4(); // use UUIDs for session IDs
    },
    name: process.env.SESSION_ID,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
  },
  mongoSession: {
    database: process.env.MONGO_DATABASE,
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    url: process.env.MONGO_URL,
  },
  mysqlSession: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }
}
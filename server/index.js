const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mysqlSession = require('express-mysql-session');
const session = require('express-session');
const graphqlHTTP = require("express-graphql");
const uuidv4 = require('uuid/v4');

const isValidSession = require('./utils/isValidSession');
const options = require('./utils/options');
const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schema');
const verifyGoogleToken = require('./utils/verifyGoogleToken');

dotenv.config();
const MySQLStore = mysqlSession(session);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
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
  store: new MySQLStore(options.mysqlSession),
}));

app.use(
  "/graphql",
  cors({origin: 'http://localhost:3000'}),
  isValidSession(),
  graphqlHTTP({schema, rootValue: resolvers}),
);

app.use('/heartbeat', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ health: `ok` }));
});

app.use(
  "/login",
  cors({origin: 'http://localhost:3000',}),
  verifyGoogleToken(),
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
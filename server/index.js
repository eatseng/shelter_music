const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mysqlSession = require('express-mysql-session');
const session = require('express-session');
const graphqlHTTP = require("express-graphql");

const isValidSession = require('./utils/isValidSession');
const logout = require('./utils/logout');
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
  ...options.expressSession,
  store: new MySQLStore(options.mysqlSession),
}));

app.use(
  '/graphql',
  cors({origin: 'http://localhost:3000'}),
  isValidSession(),
  graphqlHTTP({schema, rootValue: resolvers}),
);

app.use('/heartbeat', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ health: `ok` }));
});

app.use(
  '/login',
  cors({origin: 'http://localhost:3000'}),
  verifyGoogleToken(),
);

app.use('/logout', cors({origin: 'http://localhost:3000'}), logout());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
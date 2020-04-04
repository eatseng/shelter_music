const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const graphqlHTTP = require("express-graphql");

const resolvers = require('./graphql/resolvers');
const schema = require('./graphql/schema');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/graphql", cors(), graphqlHTTP({schema, rootValue: resolvers}));

app.use('/heartbeat', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ health: `ok` }));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./shema');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = new ApolloServer({ schema });
server.applyMiddleware({ app });

module.exports = app;

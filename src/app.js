const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const players = [
  {
    name: 'Mats hummels',
    image: 'https://pbs.twimg.com/profile_images/976109234906640384/YQJK5Ilz_400x400.jpg',
  },
];

const typeDefs = gql`
  type Player {
    name: String
    image: String
  }

  type Query {
    players: [Player]
  }
`;

const resolvers = {
  Query: {
    players: () => players,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

module.exports = app;
